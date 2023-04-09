import { Checkin, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

import { ICheckInsRepository } from '../ICheckInsRespository'

export class CheckInsRepositoryInMemory implements ICheckInsRepository {
  public items: Checkin[] = []

  async countByUserId(userId: string): Promise<number> {
    const checkIns = this.items.filter((checkIn) => checkIn.user_id === userId)

    const total = checkIns.length

    return total
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const listCheckIns = this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return listCheckIns
  }

  async findByUserIdOnDate(
    userId: string,
    data: Date,
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(data).startOf('date')
    const endOfTheDay = dayjs(data).endOf('date')

    const checkInSameOnDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      // clean code
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInSameOnDate) {
      return null
    }

    return checkInSameOnDate
  }

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkin: Checkin = {
      // clean code
      // ?? --> significa senão, ou seja, senão tiver data.id então use randomUUID()
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkin)

    return checkin
  }
}