import { compare } from 'bcryptjs'

import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'
import { User } from '@prisma/client'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // search user by email

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // compare password_hash with password if are compatives
    // dicas de clean code: variáveis que representam um boolean começamos com um sufixo -> is, has, does

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
