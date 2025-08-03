import { Usage } from '@/domain/entities/usage'
import os from 'os'
import disk from 'diskusage'
import { InternalError } from 'project-custom-errors'
import { NotifiableStandardAction } from '@/application/standard-actions/notifiable-standard-action'
import { StandardAction } from '@/domain/protocols/standard-action'

export class DiskUsageSystemStorageMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'Disk Usage',
      messageNotifier,
      Number.parseInt(process.env.STORAGE_PERCENTAGE_LIMIT || '10'),
      Number.parseInt(
        process.env.STORAGE_PERCENTAGE_NOTIFICATION_INTERVAL || '1'
      )
    )
  }

  protected async getUsage(): Promise<Usage> {
    try {
      const path = os.platform() === 'win32' ? 'C:' : '/'
      const info = disk.checkSync(path)
      return new Usage(info.total, info.total - info.free)
    } catch (err) {
      throw new InternalError('Cannot access disk storage information')
    }
  }
}
