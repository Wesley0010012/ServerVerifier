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

export class ServerVerifierFactory {
  private static readonly monitors: Record<
    string,
    new (notifier: ConsoleLogMessageNotifier) => StandardAction<void, void>
  > = {
    STORAGE_CHECK: DiskUsageSystemStorageMonitor,
    FILE_SYSTEM_HEATH: FileSystemHealthMonitor,
    NETWORK_USAGE: NetworkUsageMonitor,
    SWAP_USAGE: SwapUsageMonitor,
    BATTERY_STATUS: BatteryStatusMonitor,
    MEMORY_CHECK: SystemMemoryMonitor,
    SYSTEM_LOAD: SystemLoadMonitor,
    CPU_CHECK: OsCpuMonitor
  }

  private static buildMonitors(
    messageNotifier: StandardAction<string, void>
  ): StandardAction<void, void>[] {
    return Object.entries(this.monitors)
      .filter(([envKey]) => process.env[envKey] === 'true')
      .map(([_, MonitorClass]) => new MonitorClass(messageNotifier))
  }

  public static build(): ServerVerifierController {
    const messageNotifier = new ConsoleLogMessageNotifier()

    return new ServerVerifierController(
      this.buildMonitors(messageNotifier),
      messageNotifier,
      Number.parseInt(process.env.MONITOR_TIMEOUT_MS ?? '1')
    )
  }
}
