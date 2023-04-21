import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
// import { User } from '@prisma/client'
import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'

interface IRequest {
  userId: string
}

interface IUserMapped {
  id: string
  name: string
  email: string
}

interface IResponse {
  userMapped: IUserMapped
}

class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userMapped: IUserMapped = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    return {
      userMapped,
    }
  }
}

export { GetUserProfileUseCase }
