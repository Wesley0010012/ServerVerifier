import { NotifiableStandardAction } from '@/application/notifiable-standard-action'
import { Usage } from '@/domain/entities/usage'
import { StandardAction } from '@/domain/protocols/standard-action'
import os from 'os'

export class OsCpuMonitor extends NotifiableStandardAction {
  public constructor(messageNotifier: StandardAction<string, void>) {
    super(
      'Cpu',
      messageNotifier,
      Number.parseInt(process.env.CPU_PERCENTAGE_LIMIT || '80'),
      Number.parseInt(process.env.CPU_PERCENTAGE_NOTIFICATION_INTERVAL || '1')
    )
  }

  private getCpuTimes(): Required<{ used: number; total: number }> {
    const cpus = os.cpus()
    let user = 0,
      nice = 0,
      sys = 0,
      idle = 0,
      irq = 0

    cpus.forEach(cpu => {
      user += cpu.times.user
      nice += cpu.times.nice
      sys += cpu.times.sys
      idle += cpu.times.idle
      irq += cpu.times.irq
    })

    const used = user + nice + sys + irq
    const total = used + idle

    return { used, total }
  }

  protected async getUsage(): Promise<Usage> {
    const start = this.getCpuTimes()

    await new Promise(resolve => setTimeout(resolve, 100))

    const end = this.getCpuTimes()
    const usedDiff = end.used - start.used
    const totalDiff = end.total - start.total

    return new Usage(totalDiff, usedDiff)
  }
}
