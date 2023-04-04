import { env } from '@/env'
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export async function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ msg: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // aqui poderiamos usar ferramentas como Datalog, NewRelic ou Sentry para
    // observar e avisar sobre erros na produção
  }

  return response.status(500).json({ error: 'Internal server error.' })
}
