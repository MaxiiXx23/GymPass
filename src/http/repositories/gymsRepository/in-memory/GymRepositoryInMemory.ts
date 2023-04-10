import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { IGymRepository } from '../IGymsRepository'
import { Decimal } from '@prisma/client/runtime/library'

export class GymRepositoryInMemory implements IGymRepository {
  public items: Gym[] = []

  async findManyByQuery(query: string, page: number): Promise<Gym[]> {
    const gyms = this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findByTitle(title: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.title === title)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ? data.id : randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
