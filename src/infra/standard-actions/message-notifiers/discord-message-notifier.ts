import { StandardAction } from '@/domain/protocols/standard-action'
import { InternalError } from 'project-custom-errors'

export class DiscordMessageNotifier implements StandardAction<string, void> {
  constructor(
    private readonly connectionUrl: string,
    private readonly connectionToken: string
  ) {}

  public async process(message: string): Promise<void> {
    const attempt = async (retry = false): Promise<void> => {
      const response = await fetch(this.connectionUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bot ${this.connectionToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
      })

      if (response.status === 429 && !retry) {
        const body = await response.json()
        const retryAfter = body?.retry_after ?? 1

        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000))
        return attempt(true)
      }

      const data = await response.text()

      if (!response.ok) {
        throw new InternalError(
          `Cannot send messages to Discord connection: ${data}`
        )
      }
    }

    await attempt()
  }
}
