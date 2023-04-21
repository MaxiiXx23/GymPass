import { describe, it, expect, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'

import { SearchFetchGymsUseCase } from './SearchFetchGymsUseCase'

import { GymRepositoryInMemory } from '@/http/repositories/gymsRepository/in-memory/GymRepositoryInMemory'

let gymsRepository: GymRepositoryInMemory
let sut: SearchFetchGymsUseCase

describe('Search Fetch Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymRepositoryInMemory()
    sut = new SearchFetchGymsUseCase(gymsRepository)
  })

  it('Should to be able to search gyms for query on the field title', async () => {
    await gymsRepository.create({
      id: `gym-id-1`,
      title: 'Gym TypeScript',
      description: 'Description Test',
      phone: '',
      latitude: -23.4383508,
      longitude: -46.3205561,
    })

    await gymsRepository.create({
      id: `gym-id-2`,
      title: 'Gym Javascript',
      description: 'Description Test',
      phone: '',
      latitude: -23.4383508,
      longitude: -46.3205561,
    })

    await gymsRepository.create({
      id: `gym-id-3`,
      title: 'Gym Node.js',
      description: 'Description Test',
      phone: '',
      latitude: -23.4383508,
      longitude: -46.3205561,
    })

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-id-1' }),
      expect.objectContaining({ id: 'gym-id-2' }),
      expect.objectContaining({ id: 'gym-id-3' }),
    ])
  })

  it('Should to be able to search gyms for query of shape paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-id-${i}`,
        title: `Gym Javascript - ${randomUUID()}`,
        description: 'Description Test',
        phone: '',
        latitude: -23.4383508,
        longitude: -46.3205561,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(20)
  })
})
