import { describe, it, expect, beforeEach } from 'vitest'

import { CreateUserUseCase } from './CreateUserUseCase'
import { compare } from 'bcryptjs'
import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'

// Unit Testing

let usersRepository: IUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })
  it('Should to be create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))

    // expect(user).toHaveProperty('id')
  })

  it('Should to be create hash user to register', async () => {
    const { password_hash } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not to be create user with same email twice', async () => {
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
