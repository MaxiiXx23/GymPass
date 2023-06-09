import { Gym, Prisma } from '@prisma/client'

export interface IFindManyNearbyParams {
  userLatitude: number
  userLongitude: number
  page: number
}
export interface IGymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  findByTitle(title: string): Promise<Gym | null>
  findManyByQuery(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: IFindManyNearbyParams): Promise<Gym[]>
}
