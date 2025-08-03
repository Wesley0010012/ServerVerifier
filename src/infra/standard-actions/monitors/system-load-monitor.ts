import { Usage } from '@/domain/entities/usage'
import { InternalError } from 'project-custom-errors'
import { NotifiableStandardAction } from '@/application/standard-actions/notifiable-standard-action'
import { StandardAction } from '@/domain/protocols/standard-action'
import { loadavg } from 'os'

export class SystemLoadMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'System Load',
      messageNotifier,
      Number.parseInt(process.env.LOAD_PERCENTAGEM_LIMIT || '80'),
      Number.parseInt(process.env.LOAD_PERCENTAGE_NOTIFICATION_INTERVAL || '1')
    )
  }

  protected async getUsage(): Promise<Usage> {
    try {
      const load = loadavg()[0]
      return new Usage(100, load)
    } catch {
      throw new InternalError('Cannot access uptime/load information')
    }
  }
}
