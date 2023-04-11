import { Checkin, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findById(id: string): Promise<Checkin | null>
  countByUserId(userId: string): Promise<number>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  findByUserIdOnDate(userId: string, data: Date): Promise<Checkin | null>
  save(data: Checkin): Promise<Checkin>
}
