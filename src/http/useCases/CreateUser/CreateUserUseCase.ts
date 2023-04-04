import { hash } from 'bcryptjs'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest) {
    const password_hash = await hash(password, 8)

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return user
  }
}
