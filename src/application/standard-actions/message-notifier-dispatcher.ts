import { StandardAction } from '@/domain/protocols/standard-action'

export class MessageNotifierDispatcher implements StandardAction<string, void> {
  public constructor(
    private readonly notifiers: StandardAction<string, void>[]
  ) {}

  public async process(input: string): Promise<void> {
    this.notifiers.forEach(async notifier => await notifier.process(input))
  }
}
