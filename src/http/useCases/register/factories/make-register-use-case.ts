import { PrismaUsersRepository } from '@/http/repositories/usersRepository/prisma/prisma-users-repository'
import { RegisterUseCase } from '../RegisterUseCase'

// Factory Pattern --> serve para centralizarmos as dependências para um determina function ou class
// Até o momento esse Pattern está infligindo o principío DIP (D) do SOLID.

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
