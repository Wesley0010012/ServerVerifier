import { StandardAction } from '@/domain/protocols/standard-action'
import { Runner } from '../protocols/runner'

export class ServerVerifierController implements Runner {
  private intervalId: NodeJS.Timeout

  public constructor(
    private readonly actions: StandardAction<void, void>[],
    private readonly messageNotifier: StandardAction<string, void>,
    private readonly intervalMs: number
  ) {}

  private async execute() {
    try {
      const activities = this.actions.map(action => action.process())

      await Promise.all(activities)
    } catch (e: any) {
      await this.messageNotifier.process(
        `Error occur in system during execution: ${(e as Error).message}`
      )
    }
  }

  public async start(): Promise<void> {
    this.intervalId = setInterval(async () => {
      await this.execute()
    }, this.intervalMs)
  }

  public async stop(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
