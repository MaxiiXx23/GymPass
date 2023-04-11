import { describe, it, expect, beforeEach } from 'vitest'

import { FetchNearbyGymsUseCase } from './FetchNearbyGymsUseCase'

import { GymRepositoryInMemory } from '@/http/repositories/gymsRepository/in-memory/GymRepositoryInMemory'
import { IGymRepository } from '@/http/repositories/gymsRepository/IGymsRepository'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let gymsRepository: IGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymRepositoryInMemory()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should to be able fetch nearby gym from user', async () => {
    await gymsRepository.create({
      title: 'Gym AWS',
      description: 'O POWER OF THE AWS!',
      phone: '',
      latitude: -23.4361416,
      longitude: -46.319734,
    })

    await gymsRepository.create({
      title: 'Gym Typescript',
      description: 'The Best Gym in Typescript is here!',
      phone: '',
      latitude: -23.4382112,
      longitude: -46.3205717,
    })

    const userLatitude = -23.4409044
    const userLongitude = -46.3214427

    const { gyms } = await sut.execute({
      userLatitude,
      userLongitude,
      page: 1,
    })

    expect(gyms).toHaveLength(2)
  })

  it('Should to be able paginated fetch nearby gym from user', async () => {
    for (let i = 1; i <= 41; i++) {
      await gymsRepository.create({
        title: `Gym-${i}`,
        description: `Random description`,
        phone: '',
        latitude: -23.4382112,
        longitude: -46.3205717,
      })
    }

    const userLatitude = -23.4409044
    const userLongitude = -46.3214427

    const { gyms } = await sut.execute({
      userLatitude,
      userLongitude,
      page: 2,
    })

    expect(gyms).toHaveLength(20)
  })

  it('Should not be able fetch gyms nearby from user if latitude or longitude be zero', async () => {
    await gymsRepository.create({
      title: `Gym John Doe`,
      description: `Random description`,
      phone: '',
      latitude: -23.4382112,
      longitude: -46.3205717,
    })

    const userLatitude = 0
    const userLongitude = 0

    expect(async () => {
      await sut.execute({
        userLatitude,
        userLongitude,
        page: 2,
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
