import { PrismaCheckinsRepository } from '@/http/repositories/checkinsRepository/prisma/prisma-checkins-repository'
import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'
import { GetUserMetricsUseCase } from '../GetUserMetricsUseCase'

export function makeGetUserMetricsUseCase(): GetUserMetricsUseCase {
  const usersRepository = new PrismaUsersRepository()
  const checkInsRepository = new PrismaCheckinsRepository()

  const useCase = new GetUserMetricsUseCase(usersRepository, checkInsRepository)

  return useCase
}
