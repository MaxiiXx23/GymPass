import { PrismaCheckinsRepository } from '@/http/repositories/checkinsRepository/prisma/prisma-checkins-repository'
import { ValidateCheckInUseCase } from '../ValidateCheckInUseCase'

export function makeValidateCheckInUseCase(): ValidateCheckInUseCase {
  const checkInsRepository = new PrismaCheckinsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
