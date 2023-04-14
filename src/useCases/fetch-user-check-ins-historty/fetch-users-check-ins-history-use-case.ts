import { Checkin } from '@prisma/client'

import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'

import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

interface IRequest {
  userId: string
  page: number
}

interface IResponse {
  checkIns: Checkin[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({ userId, page }: IRequest): Promise<IResponse> {
    const hasUser = await this.usersRepository.findById(userId)

    if (!hasUser) {
      throw new ResourceNotFoundError()
    }

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
