import { Checkin, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findByUserIdOnDate(userId: string, data: Date): Promise<Checkin | null>
}
