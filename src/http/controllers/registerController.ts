import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { EmailAlreadyExistsError } from '@/http/useCases/register/errors/EmailAlreadyExistsError'
import { makeRegisterUseCase } from '../useCases/register/factories/make-register-use-case'

export async function registerController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { name, email, password } = registerBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })

    return response.status(201).json({ msg: 'User created.' })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return response.status(409).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
