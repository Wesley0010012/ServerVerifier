import { Usage } from './usage'

export class MemoryUsage extends Usage {
  public getInGB(): number {
    return this.getFree() / 1024 ** 3
  }
}
