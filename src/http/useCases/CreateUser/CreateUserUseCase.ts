import { hash } from 'bcryptjs'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'

interface IRequest {
  name: string
  email: string
  password: string
}

// SOLID - D - Dependency Inversion Principle utilizada, onde o constructor recebe
// a abstração da class que irá ser utilizada, e não a class em si,
// assim o tornando dependente da abstração e não da class.
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
