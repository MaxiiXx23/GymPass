import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'

interface IRequest {
  userId: string
}

interface IResponse {
  countCheckIns: number
}

export class GetUserMetricsUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const hasUser = await this.usersRepository.findById(userId)

    if (!hasUser) {
      throw new ResourceNotFoundError()
    }

    const countCheckIns = await this.checkInsRepository.countByUserId(userId)

    return {
      countCheckIns,
    }
  }
}
