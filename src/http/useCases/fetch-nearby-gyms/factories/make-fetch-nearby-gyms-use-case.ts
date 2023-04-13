import { PrismaGymsRepository } from '@/http/repositories/gymsRepository/prisma/PrismaGymsRepository'
import { FetchNearbyGymsUseCase } from '../FetchNearbyGymsUseCase'

export function makeFetchNearbyGymsUseCase(): FetchNearbyGymsUseCase {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
