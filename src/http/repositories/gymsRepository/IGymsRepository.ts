import { Gym, Prisma } from '@prisma/client'

export interface IGymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findByTitle(title: string): Promise<Gym | null>
}
