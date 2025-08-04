import { EnvVarType } from '../config/environment/environment'

export function getValidatedEnv<T extends EnvVarType>(
  key: string,
  type: T
): T extends 'number' ? number : T extends 'boolean' ? boolean : string {
  const raw = process.env[key]

  if (raw === undefined) {
    throw new Error(`Missing environment variable: ${key}`)
  }

  switch (type) {
    case 'number': {
      const parsed = Number(raw)
      if (isNaN(parsed)) {
        throw new Error(`Env ${key} must be a valid number, got: ${raw}`)
      }
      return parsed as any
    }

    case 'boolean': {
      if (raw !== 'true' && raw !== 'false') {
        throw new Error(`Env ${key} must be 'true' or 'false', got: ${raw}`)
      }
      return (raw === 'true') as any
    }

    case 'string':
      return raw as any

    default:
      throw new Error(`Unsupported env var type: ${type}`)
  }
}
