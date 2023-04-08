import { Prisma, Checkin } from '@prisma/client'
import { ICheckInsRepository } from '../ICheckInsRespository'

export class PrismaCheckinsRepository implements ICheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    throw new Error('Method not implemented.')
  }

  findByUserIdOnDate(userId: string, data: Date): Promise<Checkin | null> {
    throw new Error('Method not implemented.')
  }
}
