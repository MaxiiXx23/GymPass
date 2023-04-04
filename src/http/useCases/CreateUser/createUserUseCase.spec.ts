import { describe, it, expect } from 'vitest'

import { CreateUserUseCase } from './CreateUserUseCase'
import { compare } from 'bcryptjs'
import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'

// Unit Testing

describe('Create User Use Case', () => {
  it('Should to be create a new user', async () => {
    const usersRepository = new UsersRepositoryInMemory()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))

    // expect(user).toHaveProperty('id')
  })

  it('Should to be create hash user to register', async () => {
    const usersRepository = new UsersRepositoryInMemory()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const { password_hash } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not to be create user with same email twice', async () => {
    const usersRepository = new UsersRepositoryInMemory()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const email = 'johndoe@test.com'

    await createUserUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(async () => {
      await createUserUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
