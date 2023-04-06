import { User, Prisma } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'

// SOLID - O - Open Closed Principle é utilizado nesse arquivo,
// pois implementa um interface que abstrai os métodos necessários para seu funcionamento.
class UsersRepositoryInMemory implements IUsersRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}

export { UsersRepositoryInMemory }
