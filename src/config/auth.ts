import { env } from '@/env'

export const auth = {
  secret_key_JWT: env.JWT_SECRET_KEY,
  experies_in_JWT: env.EXPIRES_IN_TOKEN,
}
