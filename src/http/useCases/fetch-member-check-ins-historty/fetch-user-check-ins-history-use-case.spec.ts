import { describe, it, expect, beforeEach } from 'vitest'

import { FetchUserCheckInsHistoryUseCase } from './fetch-users-check-ins-history-use-case'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'
import { CheckInsRepositoryInMemory } from '@/http/repositories/checkinsRepository/in-memory/checkinsRepositoryInMemory'

let usersRepository: IUsersRepository
let checkInsRepository: ICheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-ins Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    checkInsRepository = new CheckInsRepositoryInMemory()
    sut = new FetchUserCheckInsHistoryUseCase(
      usersRepository,
      checkInsRepository,
    )
  })

  it('Should to be able to fetch check-ins user history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    })
    await checkInsRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id-1',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-1' }),
      expect.objectContaining({ gym_id: 'gym-id-2' }),
    ])
  })

  it('Should to be able to fetch paginated user check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})
