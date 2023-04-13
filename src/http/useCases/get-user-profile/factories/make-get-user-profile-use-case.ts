import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../GetUserProfileUseCase'

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
