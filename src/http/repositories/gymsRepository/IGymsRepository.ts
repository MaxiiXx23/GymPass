import { Gym, Prisma } from '@prisma/client'

export interface IGymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  findByTitle(title: string): Promise<Gym | null>
}