import { DomainError } from 'project-custom-errors'

export class Usage {
  public constructor(
    private readonly _total: number,
    private readonly _used: number
  ) {
    if (_used > _total) {
      throw new DomainError(`Used (${_used}) is higher than expect ${_total}`)
    }
  }

  public getFree(): number {
    return this._total - this._used
  }

  public getInGB(): number {
    return this.getFree() / 1024 ** 3
  }

  public getPercentage(): number {
    return (this.getFree() / this._total) * 100
  }

  public isInLimit(limitPercentage: number): boolean {
    return this.getPercentage() <= limitPercentage
  }
}
