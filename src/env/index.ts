import 'dotenv/config'

import { z } from 'zod'

// Arquivo responsável por validar as variáveis ambientes na app

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET_KEY: z.string().default('testing'),
  EXPIRES_IN_TOKEN: z.string().default('30m'),
  EXPIRES_IN_REFRESH_TOKEN: z.string().default('7d'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
