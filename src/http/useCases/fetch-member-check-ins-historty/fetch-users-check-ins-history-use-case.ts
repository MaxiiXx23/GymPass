import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { Checkin } from '@prisma/client'

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
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
