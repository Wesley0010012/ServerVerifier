import { StandardAction } from '@/domain/protocols/standard-action'

export class ConsoleLogMessageNotifier implements StandardAction<string, void> {
  public async process(input: string): Promise<void> {
    console.log(input)
  }
}
