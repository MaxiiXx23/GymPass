import { Gym } from '@prisma/client'

import { IGymRepository } from '@/http/repositories/gymsRepository/IGymsRepository'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'

interface IRequest {
  userLatitude: number
  userLongitude: number
  page: number
}

interface IResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
  }: IRequest): Promise<IResponse> {
    if (userLatitude === 0 || userLongitude === 0) {
      throw new ResourceNotFoundError()
    }

    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
      page,
    })
    return {
      gyms,
    }
  }
}
