import { PrismaCheckinsRepository } from '@/http/repositories/checkinsRepository/prisma/prisma-checkins-repository'
import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-users-check-ins-history-use-case'

export function makeFetchUserCheckInsHistoryUseCase(): FetchUserCheckInsHistoryUseCase {
  const usersRepository = new PrismaUsersRepository()
  const checkInsRepository = new PrismaCheckinsRepository()

  const useCase = new FetchUserCheckInsHistoryUseCase(
    usersRepository,
    checkInsRepository,
  )

  return useCase
}
