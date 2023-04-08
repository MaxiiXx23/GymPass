import { Checkin } from '@prisma/client'

import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { IGymRepository } from '@/http/repositories/gymsRepository/IGymsRepository'

import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinates'

import { MaxDistanceError } from './errors/maxDistanceError'
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckInsError'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

interface IRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface IResponse {
  checkin: Checkin
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: IRequest): Promise<IResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calcular a distância entre o usuário e a acadêmia(mínimo 100m)

    const distance = getDistanceBetweenCoordinate(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkin = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkin,
    }
  }
}
