import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IUsersRepository } from './IUsersRepository'

export class PrismaUsersRepository implements IUsersRepository {
  // O Prisma gera automaticamente os DTOs para usarmos em nosso Pattern Repository
  // diferente do TypeORM onde é necessário criamos manualmente
  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash } = data

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
