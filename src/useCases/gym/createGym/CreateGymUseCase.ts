import { Gym } from '@prisma/client'

import { IGymRepository } from '@/http/repositories/gymsRepository/IGymsRepository'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'

import { GymAlreadyExistsError } from './errors/GymAlreadyExistsError'

interface IRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface IResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(
    private gymsRepository: IGymRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: IRequest): Promise<IResponse> {
    const hasCreatedGym = await this.gymsRepository.findByTitle(title)

    if (hasCreatedGym) {
      throw new GymAlreadyExistsError()
    }

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
