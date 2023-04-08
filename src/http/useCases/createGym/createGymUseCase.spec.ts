import { IGymRepository } from '@/http/repositories/gymsRepository/IGymsRepository'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { describe, it, beforeEach, expect } from 'vitest'
import { CreateGymUseCase } from './CreateGymUseCase'
import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'
import { GymRepositoryInMemory } from '@/http/repositories/gymsRepository/in-memory/GymRepositoryInMemory'

let usersRepository: IUsersRepository
let gymsRepository: IGymRepository

let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    gymsRepository = new GymRepositoryInMemory()

    sut = new CreateGymUseCase(gymsRepository, usersRepository)
  })

  it('Should to be able to create a new Gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Test',
      description: 'Description Test',
      phone: '',
      latitude: -23.4383508,
      longitude: -46.3205561,
    })

    expect(gym).toHaveProperty('id')
    expect(gym).toHaveProperty('title')
  })

  it('Should to be able to create a new Gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Test',
      description: 'Description Test',
      phone: '',
      latitude: -23.4383508,
      longitude: -46.3205561,
    })

    expect(gym).toHaveProperty('id')
    expect(gym).toHaveProperty('title')
  })

  it('Should not be able to create a new Gym with same title twice', async () => {
    await sut.execute({
      title: 'Gym Test',
      description: 'Description Test',
      phone: '',
      latitude: -23.4383508,
      longitude: -46.3205561,
    })

    expect(async () => {
      await sut.execute({
        title: 'Gym Test',
        description: 'Description Test',
        phone: '',
        latitude: -23.4383508,
        longitude: -46.3205561,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
