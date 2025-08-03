import { Usage } from '@/domain/entities/usage'
import { InternalError } from 'project-custom-errors'
import { NotifiableStandardAction } from '@/application/standard-actions/notifiable-standard-action'
import { StandardAction } from '@/domain/protocols/standard-action'
import si from 'systeminformation'

export class SwapUsageMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'Swap usage',
      messageNotifier,
      Number.parseInt(process.env.SWAP_PERCENTAGEM_LIMIT || '80'),
      Number.parseInt(process.env.SWAP_PERCENTAGE_NOTIFICATION_INTERVAL || '1')
    )
  }

  protected async getUsage(): Promise<Usage> {
    try {
      const mem = await si.mem()
      return new Usage(mem.swaptotal, mem.swapused)
    } catch {
      throw new InternalError('Cannot access swap usage information')
    }
  }
}
