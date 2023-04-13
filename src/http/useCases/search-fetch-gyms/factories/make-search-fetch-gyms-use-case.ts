import { PrismaGymsRepository } from '@/http/repositories/gymsRepository/prisma/PrismaGymsRepository'
import { SearchFetchGymsUseCase } from '../SearchFetchGymsUseCase'

export function makeSearchFetchGymsUseCase(): SearchFetchGymsUseCase {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchFetchGymsUseCase(gymsRepository)

  return useCase
}
