import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../AuthenticateUseCase'

export function makeAuthenticateUseCase() {
  const usersRespository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRespository)

  return authenticateUseCase
}
