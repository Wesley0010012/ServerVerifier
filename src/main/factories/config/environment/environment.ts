export type EnvVarType = 'number' | 'boolean' | 'string'

export type BaseEnvSpec = {
  key: string
  type: EnvVarType
}
