import { MonitorTypeEnum } from '@/infra/standard-actions/monitors/monitor-types-enum'
import { BaseEnvSpec } from './environment'

export const monitorsEnvironment: Record<MonitorTypeEnum, BaseEnvSpec[]> = {
  [MonitorTypeEnum.STORAGE_CHECK]: [
    { key: 'STORAGE_PERCENTAGE_LIMIT', type: 'number' },
    { key: 'STORAGE_PERCENTAGE_NOTIFICATION_INTERVAL', type: 'number' }
  ],
  [MonitorTypeEnum.FILE_SYSTEM_HEALTH]: [
    { key: 'FILESYSTEM_HEALTH_PERCENTAGEM_LIMIT', type: 'number' },
    { key: 'FILESYSTEM_HEALTH_NOTIFICATION_INTERVAL', type: 'number' }
  ],
  [MonitorTypeEnum.NETWORK_USAGE]: [
    { key: 'NETWORK_PERCENTAGEM_LIMIT', type: 'number' },
    { key: 'NETWORK_PERCENTAGE_NOTIFICATION_INTERVAL', type: 'number' }
  ],
  [MonitorTypeEnum.SWAP_USAGE]: [
    { key: 'SWAP_PERCENTAGEM_LIMIT', type: 'number' },
    { key: 'SWAP_PERCENTAGE_NOTIFICATION_INTERVAL', type: 'number' }
  ],
  [MonitorTypeEnum.BATTERY_STATUS]: [
    { key: 'BATTERY_PERCENTAGEM_LIMIT', type: 'number' },
    { key: 'BATTERY_PERCENTAGE_NOTIFICATION_INTERVAL', type: 'number' }
  ],
  [MonitorTypeEnum.MEMORY_CHECK]: [
    { key: 'MEMORY_PERCENTAGEM_LIMIT', type: 'number' },
    { key: 'MEMORY_PERCENTAGE_NOTIFICATION_INTERVAL', type: 'number' }
  ],
  [MonitorTypeEnum.SYSTEM_LOAD]: [
    { key: 'LOAD_PERCENTAGEM_LIMIT', type: 'number' },
    { key: 'LOAD_PERCENTAGE_NOTIFICATION_INTERVAL', type: 'number' }
  ],
  [MonitorTypeEnum.CPU_CHECK]: [
    { key: 'CPU_PERCENTAGE_LIMIT', type: 'number' },
    { key: 'CPU_PERCENTAGE_NOTIFICATION_INTERVAL', type: 'number' }
  ]
}
