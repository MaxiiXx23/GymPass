import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateUseCase } from './AuthenticateUseCase'
import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

let usersRepositoryInMemory: UsersRepositoryInMemory
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    // SUT --> System Under Test
    sut = new AuthenticateUseCase(usersRepositoryInMemory)
  })

  it('Should to be authenticate user', async () => {
    const email = 'johndoe@test.com'
    const password_hash = await hash('123456', 8)

    await usersRepositoryInMemory.create({
      name: 'John Doe',
      email,
      password_hash,
    })

    const { user } = await sut.execute({
      email,
      password: '123456',
    })

    expect(user).toHaveProperty('email')
  })

  it('Should not be able to authenticate with invalid e-mail', async () => {
    const email = 'johndoe@test.com'
    const password_hash = await hash('123456', 8)

    await usersRepositoryInMemory.create({
      name: 'John Doe',
      email,
      password_hash,
    })

    expect(async () => {
      await sut.execute({
        email: 'johndoeinvalid@test.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with invalid password', async () => {
    const email = 'johndoe@test.com'
    const password_hash = await hash('123456', 8)

    await usersRepositoryInMemory.create({
      name: 'John Doe',
      email,
      password_hash,
    })

    expect(async () => {
      await sut.execute({
        email,
        password: 'passwordInvalid',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
