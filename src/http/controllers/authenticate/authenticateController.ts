import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/useCases/authenticate/errors/InvalidCredentialsError'
import { makeAuthenticateUseCase } from '@/useCases/authenticate/factories/make-authenticate-use-case'

export async function authenticateController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const { token } = await authenticateUseCase.execute({ email, password })

    return response.status(200).json({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return response.status(400).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
