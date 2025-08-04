import { StandardAction } from '@/domain/protocols/standard-action'
import { ConsoleLogMessageNotifier } from '@/infra/standard-actions/message-notifiers/console-log-message-notifier'
import { getValidatedEnv } from './utils/env-validation'
import { BaseEnvSpec } from './config/environment/environment'
import { MessageNotifiersTypeEnum } from '@/infra/standard-actions/message-notifiers/message-notifiers-type-enum'
import { DiscordMessageNotifier } from '@/infra/standard-actions/message-notifiers/discord-message-notifier'
import { messageNotifiersEnvironment } from './config/environment/message-notifiers-environment'
import { MessageNotifierDispatcher } from '@/application/standard-actions/message-notifier-dispatcher'

export class MessageNotifierDispatcherFactory {
  private static readonly messageNotifiers: Record<
    MessageNotifiersTypeEnum,
    new (...args: any[]) => StandardAction<string, void>
  > = {
    [MessageNotifiersTypeEnum.CONSOLE_LOG_MESSAGE_NOTIFIER]:
      ConsoleLogMessageNotifier,
    [MessageNotifiersTypeEnum.DISCORD_MESSAGE_NOTIFIER]: DiscordMessageNotifier
  }

  private static buildNotifiers(): StandardAction<string, void>[] {
    return Object.entries(this.messageNotifiers)
      .filter(([envKey]) => process.env[envKey] === 'true')
      .map(([envKey, MessageNotifierClass]) => {
        const validatedEnvs = messageNotifiersEnvironment[envKey].map(
          (env: BaseEnvSpec) => {
            return getValidatedEnv(env.key, env.type)
          }
        )

        return new MessageNotifierClass(...validatedEnvs)
      })
  }

  public static build(): StandardAction<string, void> {
    return new MessageNotifierDispatcher(this.buildNotifiers())
  }
}
