import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { GetUserMetricsUseCase } from './GetUserMetricsUseCase'

import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'
import { CheckInsRepositoryInMemory } from '@/http/repositories/checkinsRepository/in-memory/checkinsRepositoryInMemory'

import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let usersRepository: IUsersRepository
let checkInsRepository: ICheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    checkInsRepository = new CheckInsRepositoryInMemory()
    sut = new GetUserMetricsUseCase(usersRepository, checkInsRepository)

    const passwordHashed = await hash('12346', 8)

    await usersRepository.create({
      id: 'user-id-1',
      name: 'John Doe',
      email: 'johndoe@testing.com',
      password_hash: passwordHashed,
    })

    for (let i = 1; i <= 2; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
      })
    }
  })

  it('Should to able to get count check-ins user', async () => {
    const userId = 'user-id-1'
    const { countCheckIns } = await sut.execute({ userId })

    expect(countCheckIns).toEqual(2)
  })

  it('Should not be able to get count check-ins without the User', async () => {
    const userId = 'invalid-user-id'

    expect(async () => {
      await sut.execute({ userId })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
