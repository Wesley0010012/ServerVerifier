import { Usage } from '@/domain/entities/usage'
import { InternalError } from 'project-custom-errors'
import { NotifiableStandardAction } from '@/application/notifiable-standard-action'
import { StandardAction } from '@/domain/protocols/standard-action'
import si from 'systeminformation'

export class NetworkUsageMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'Network usage',
      messageNotifier,
      Number.parseInt(process.env.NETWORK_PERCENTAGEM_LIMIT || '80'),
      Number.parseInt(
        process.env.NETWORK_PERCENTAGE_NOTIFICATION_INTERVAL || '1'
      )
    )
  }

  protected async getUsage(): Promise<Usage> {
    try {
      const netStats = await si.networkStats()
      const total = netStats.reduce(
        (acc, n) => acc + n.rx_bytes + n.tx_bytes,
        0
      )
      const used = netStats.reduce((acc, n) => acc + n.rx_sec + n.tx_sec, 0)
      return new Usage(total, used)
    } catch {
      throw new InternalError('Cannot access network usage information')
    }
  }
}
