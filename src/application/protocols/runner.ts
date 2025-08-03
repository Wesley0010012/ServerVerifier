export interface Runner {
  start(): Promise<void>

  stop(): Promise<void>
}
