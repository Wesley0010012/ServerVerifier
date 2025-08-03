import { MemoryUsage } from '@/domain/entities/memory-usage'
import { Usage } from '@/domain/entities/usage'
import { StandardAction } from '@/domain/protocols/standard-action'

export abstract class NotifiableStandardAction
  implements StandardAction<void, void>
{
  private latestNotification: Date

  public constructor(
    private readonly actionName: string,
    private readonly messageNotifier: StandardAction<string, void>,
    private readonly limit: number,
    private readonly notificationInterval: number
  ) {}

  protected async notifyUsage(usage: Usage): Promise<void> {
    if (!this.hasPassedInterval(this.latestNotification)) return

    const free = usage.getFree()
    const percentage = usage.getPercentage().toFixed(2)
    const inGB =
      usage instanceof MemoryUsage ? ` (${usage.getInGB().toFixed(2)}GB)` : ''

    const message = `${this.actionName} limit is Exceeded: ${free}${inGB} - ${percentage}%`

    await this.messageNotifier.process(message)
    this.latestNotification = new Date()
  }

  private hasPassedInterval(date: Date): boolean {
    if (date == null) {
      return true
    }

    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInSeconds = diffInMs / 60
    return diffInSeconds > this.notificationInterval
  }

  protected abstract getUsage(): Promise<Usage>

  public async process(input: void): Promise<void> {
    const usage = await this.getUsage()

    if (!usage.isInLimit(this.limit)) {
      await this.notifyUsage(usage)
    }
  }
}
