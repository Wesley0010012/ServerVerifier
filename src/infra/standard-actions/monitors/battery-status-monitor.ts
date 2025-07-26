import { Usage } from '@/domain/entities/usage'
import { InternalError } from 'project-custom-errors'
import { NotifiableStandardAction } from '@/application/notifiable-standard-action'
import { StandardAction } from '@/domain/protocols/standard-action'
import si from 'systeminformation'

export class BatteryStatusMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'Battery status',
      messageNotifier,
      Number.parseInt(process.env.BATTERY_PERCENTAGEM_LIMIT || '20'),
      Number.parseInt(
        process.env.BATTERY_PERCENTAGE_NOTIFICATION_INTERVAL || '1'
      )
    )
  }

  protected async getUsage(): Promise<Usage> {
    try {
      const battery = await si.battery()
      return new Usage(100, 100 - (battery.percent || 0)) // usado = % drenada
    } catch {
      throw new InternalError('Cannot access battery status information')
    }
  }
}
