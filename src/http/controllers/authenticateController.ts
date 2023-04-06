import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/http/useCases/authenticate/AuthenticateUseCase'
import { InvalidCredentialsError } from '@/http/useCases/authenticate/errors/InvalidCredentialsError'

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

    const usersRespository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRespository)

    const { user } = await authenticateUseCase.execute({ email, password })

    return response.status(200).json({ user })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return response.status(400).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
