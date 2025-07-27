import { StandardAction } from '@/domain/protocols/standard-action'

export class ServerVerifierController {
  public constructor(
    private readonly actions: StandardAction<void, void>[],
    private readonly messageNotifier: StandardAction<string, void>
  ) {}

  public async execute() {
    try {
      const activities = this.actions.map(action => action.process())

      await Promise.all(activities)
    } catch (e: any) {
      await this.messageNotifier.process(
        `Error occur in system during execution: ${(e as Error).message}`
      )
    }
  }
}
