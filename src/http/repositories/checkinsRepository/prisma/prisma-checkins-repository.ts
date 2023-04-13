import { prisma } from '@/lib/prisma'
import { Prisma, Checkin } from '@prisma/client'
import dayjs from 'dayjs'

import { ICheckInsRepository } from '../ICheckInsRespository'

export class PrismaCheckinsRepository implements ICheckInsRepository {
  async findById(id: string): Promise<Checkin | null> {
    const checkIn = await prisma.checkin.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkin.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const take = 20
    const skip = (page - 1) * 20

    const checkIns = await prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      take,
      skip,
    })

    return checkIns
  }

  async save(data: Checkin): Promise<Checkin> {
    const checkInUpdated = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkInUpdated
  }

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = await prisma.checkin.create({
      data,
    })

    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }
}
