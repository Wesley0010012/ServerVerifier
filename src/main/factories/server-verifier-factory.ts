import { StandardAction } from '@/domain/protocols/standard-action'
import { ServerVerifierController } from '@/application/controllers/server-verifier-controller'
import { ConsoleLogMessageNotifier } from '@/infra/standard-actions/message-notifiers/console-log-message-notifier'
import { BatteryStatusMonitor } from '@/infra/standard-actions/monitors/battery-status-monitor'
import { OsCpuMonitor } from '@/infra/standard-actions/monitors/cpu-monitor'
import { FileSystemHealthMonitor } from '@/infra/standard-actions/monitors/file-system-health-monitor'
import { NetworkUsageMonitor } from '@/infra/standard-actions/monitors/network-usage-monitor'
import { SwapUsageMonitor } from '@/infra/standard-actions/monitors/swap-usage-monitor'
import { SystemLoadMonitor } from '@/infra/standard-actions/monitors/system-load-monitor'
import { SystemMemoryMonitor } from '@/infra/standard-actions/monitors/system-memory-monitor'
import { DiskUsageSystemStorageMonitor } from '@/infra/standard-actions/monitors/system-storage-monitor'
import { monitorsEnvironment } from './config/environment/monitors-environment'
import { getValidatedEnv } from './utils/env-validation'
import { BaseEnvSpec } from './config/environment/environment'
import { MonitorTypeEnum } from '@/infra/standard-actions/monitors/monitor-types-enum'
import { MessageNotifierDispatcherFactory } from './message-notifier-dispatcher-factory'

export class ServerVerifierFactory {
  private static readonly monitors: Record<
    MonitorTypeEnum,
    new (notifier: ConsoleLogMessageNotifier) => StandardAction<void, void>
  > = {
    [MonitorTypeEnum.STORAGE_CHECK]: DiskUsageSystemStorageMonitor,
    [MonitorTypeEnum.FILE_SYSTEM_HEALTH]: FileSystemHealthMonitor,
    [MonitorTypeEnum.NETWORK_USAGE]: NetworkUsageMonitor,
    [MonitorTypeEnum.SWAP_USAGE]: SwapUsageMonitor,
    [MonitorTypeEnum.BATTERY_STATUS]: BatteryStatusMonitor,
    [MonitorTypeEnum.MEMORY_CHECK]: SystemMemoryMonitor,
    [MonitorTypeEnum.SYSTEM_LOAD]: SystemLoadMonitor,
    [MonitorTypeEnum.CPU_CHECK]: OsCpuMonitor
  }

  private static buildMonitors(
    messageNotifier: StandardAction<string, void>
  ): StandardAction<void, void>[] {
    return Object.entries(this.monitors)
      .filter(([envKey]) => process.env[envKey] === 'true')
      .map(([envKey, MonitorClass]) => {
        monitorsEnvironment[envKey].map((env: BaseEnvSpec) => {
          getValidatedEnv(env.key, env.type)
        })

        return new MonitorClass(messageNotifier)
      })
  }

  public static build(): ServerVerifierController {
    const messageNotifier = MessageNotifierDispatcherFactory.build()

    const monitorTimeout = getValidatedEnv('MONITOR_TIMEOUT_MS', 'number')

    return new ServerVerifierController(
      this.buildMonitors(messageNotifier),
      messageNotifier,
      monitorTimeout
    )
  }
}
