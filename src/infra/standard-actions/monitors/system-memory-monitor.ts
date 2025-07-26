import { Usage } from '@/domain/entities/usage'
import { InternalError } from 'project-custom-errors'
import { NotifiableStandardAction } from '@/application/notifiable-standard-action'
import { totalmem, freemem } from 'os'
import { StandardAction } from '@/domain/protocols/standard-action'

export class SystemMemoryMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'Memory Usage',
      messageNotifier,
      Number.parseInt(process.env.MEMORY_PERCENTAGEM_LIMIT || '10'),
      Number.parseInt(
        process.env.MEMORY_PERCENTAGE_NOTIFICATION_INTERVAL || '1'
      )
    )
  }

  protected async getUsage(): Promise<Usage> {
    try {
      const totalMem = totalmem()
      const freeMem = freemem()
      const usedMem = totalMem - freeMem

      return new Usage(totalMem, usedMem)
    } catch (err) {
      throw new InternalError('Cannot access memory usage information')
    }
  }
}
