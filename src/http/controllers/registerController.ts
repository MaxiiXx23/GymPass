import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { CreateUserUseCase } from '@/http/useCases/CreateUser/CreateUserUseCase'
import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma-users-repository'
import { EmailAlreadyExistsError } from '@/http/useCases/CreateUser/errors/EmailAlreadyExistsError'

export async function registerController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { name, email, password } = registerSchema.parse(request.body)
    const usersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    await createUserUseCase.execute({ name, email, password })

    return response.status(201).json({ msg: 'User created.' })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return response.status(409).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
