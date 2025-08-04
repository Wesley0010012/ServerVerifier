import { MessageNotifiersTypeEnum } from '@/infra/standard-actions/message-notifiers/message-notifiers-type-enum'
import { BaseEnvSpec } from './environment'

export const messageNotifiersEnvironment: Record<
  MessageNotifiersTypeEnum,
  BaseEnvSpec[]
> = {
  [MessageNotifiersTypeEnum.CONSOLE_LOG_MESSAGE_NOTIFIER]: [],
  [MessageNotifiersTypeEnum.DISCORD_MESSAGE_NOTIFIER]: [
    { key: 'DISCORD_CONNECTION_URL', type: 'string' },
    { key: 'DISCORD_CONNECTION_TOKEN', type: 'string' }
  ]
}
