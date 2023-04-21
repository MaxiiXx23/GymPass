import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { GetUserProfileUseCase } from './GetUserProfileUseCase'

import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'

let usersRepository: UsersRepositoryInMemory
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('should to be able to get profile user by id', async () => {
    const passwordHashed = await hash('123456', 8)

    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password_hash: passwordHashed,
    })

    const { userMapped } = await getUserProfileUseCase.execute({
      userId: userCreated.id,
    })

    expect(userMapped).toHaveProperty('id')
    expect(userMapped).toHaveProperty('email')
  })

  it('should not to be able get user profile with wrong id', async () => {
    const passwordHashed = await hash('123456', 8)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password_hash: passwordHashed,
    })

    expect(async () => {
      await getUserProfileUseCase.execute({
        userId: 'invalid-id-user',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
