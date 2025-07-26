import { Usage } from '@/domain/entities/usage'
import { InternalError } from 'project-custom-errors'
import { NotifiableStandardAction } from '@/application/notifiable-standard-action'
import { StandardAction } from '@/domain/protocols/standard-action'
import si from 'systeminformation'

export class FileSystemHealthMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'File System Health',
      messageNotifier,
      Number.parseInt(process.env.FILESYSTEM_HEALTH_PERCENTAGEM_LIMIT || '100'),
      Number.parseInt(
        process.env.FILESYSTEM_HEALTH_NOTIFICATION_INTERVAL || '1'
      )
    )
  }

  protected async getUsage(): Promise<Usage> {
    try {
      const disks = await si.diskLayout()
      const total = disks.length
      const healthy = disks.filter(
        d => !d.smartStatus || d.smartStatus === 'OK'
      ).length
      return new Usage(total, total - healthy)
    } catch {
      throw new InternalError('Cannot access file system health information')
    }
  }
}
