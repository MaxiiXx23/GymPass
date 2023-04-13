import { prisma } from '@/lib/prisma'
import { Prisma, Gym } from '@prisma/client'
import { IFindManyNearbyParams, IGymRepository } from '../IGymsRepository'

export class PrismaGymsRepository implements IGymRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findByTitle(title: string): Promise<Gym | null> {
    const gym = await prisma.gym.findFirst({
      where: {
        title,
      },
    })

    return gym
  }

  async findManyByQuery(query: string, page: number): Promise<Gym[]> {
    const take = 20
    const skip = (page - 1) * 20

    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take,
      skip,
    })

    return gyms
  }

  async findManyNearby({
    userLatitude,
    userLongitude,
  }: IFindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }
}
