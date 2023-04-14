import { PrismaCheckinsRepository } from '@/http/repositories/checkinsRepository/prisma/prisma-checkins-repository'
import { PrismaGymsRepository } from '@/http/repositories/gymsRepository/prisma/PrismaGymsRepository'
import { CheckInUseCase } from '../CheckInUseCase'
import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'

export function makeCheckInUseCase(): CheckInUseCase {
  const checkInsRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CheckInUseCase(
    checkInsRepository,
    gymsRepository,
    usersRepository,
  )

  return useCase
}
