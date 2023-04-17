import { PrismaGymsRepository } from '@/http/repositories/gymsRepository/prisma/PrismaGymsRepository'
import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'
import { CreateGymUseCase } from '../CreateGymUseCase'

export function makeCreateGymUseCase(): CreateGymUseCase {
  const gymsRepository = new PrismaGymsRepository()
  const usersRepository = new PrismaUsersRepository()

  const useCase = new CreateGymUseCase(gymsRepository, usersRepository)

  return useCase
}
