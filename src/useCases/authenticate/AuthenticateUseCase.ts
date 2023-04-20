import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

import { auth } from '@/config/auth'
interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  refreshToken: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // search user by email

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // dicas de clean code: variáveis que representam um boolean começamos com um sufixo -> is, has, does
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const token = sign({}, auth.secret_key_JWT, {
      subject: user.id,
      expiresIn: auth.experies_in_JWT,
    })

    const refreshToken = sign({}, auth.secret_key_JWT, {
      subject: user.id,
      expiresIn: auth.experies_in_JWT,
    })

    return {
      token,
      refreshToken,
    }
  }
}
