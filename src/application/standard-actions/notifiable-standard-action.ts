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
    if (this.hasPassedInterval(this.latestNotification)) {
      await this.messageNotifier.process(
        `${this.actionName} limit is Exceeded: ${usage.getFree()} (${usage
          .getInGB()
          .toFixed(2)}GB) - ${usage.getPercentage().toFixed(2)}%`
      )

      this.latestNotification = new Date()
    }
  }

  private hasPassedInterval(date: Date): boolean {
    if (date == null) {
      return true
    }

    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = diffInMs / 86400000
    return diffInDays > this.notificationInterval
  }

  protected abstract getUsage(): Promise<Usage>

  public async process(input: void): Promise<void> {
    const usage = await this.getUsage()

    if (!usage.isInLimit(this.limit)) {
      await this.notifyUsage(usage)
    }
  }
}
