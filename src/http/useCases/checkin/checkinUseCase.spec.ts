import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { hash } from 'bcryptjs'

import { CheckInUseCase } from './CheckInUseCase'

import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { CheckInsRepositoryInMemory } from '@/http/repositories/checkinsRepository/in-memory/checkinsRepositoryInMemory'
import { IGymRepository } from '@/http/repositories/gymsRepository/IGymsRepository'
import { GymRepositoryInMemory } from '@/http/repositories/gymsRepository/in-memory/GymRepositoryInMemory'
import { IUsersRepository } from '@/http/repositories/usersRepository/IUsersRepository'
import { UsersRepositoryInMemory } from '@/http/repositories/usersRepository/in-memory/usersRepositoryInMemory'

import { MaxDistanceError } from './errors/maxDistanceError'
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckInsError'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'

let checkInsRepository: ICheckInsRepository
let gymsRepository: IGymRepository
let usersRepository: IUsersRepository
let sut: CheckInUseCase

describe('Checkins Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new CheckInsRepositoryInMemory()
    gymsRepository = new GymRepositoryInMemory()
    usersRepository = new UsersRepositoryInMemory()
    sut = new CheckInUseCase(
      checkInsRepository,
      gymsRepository,
      usersRepository,
    )

    const passwordHashed = await hash('123456', 8)

    await usersRepository.create({
      id: 'user-id-1',
      name: 'John Doe',
      email: 'johndoe@testing.com',
      password_hash: passwordHashed,
    })

    await gymsRepository.create({
      id: 'gym-id-1',
      title: 'Smart Fit',
      description: 'A Smart Fit is the best!',
      phone: '418364802',
      latitude: -23.4442439,
      longitude: -46.321571,
    })
    // Aqui dizemos ao Vitest que vms mockar(simular/criar um dado fake) para Date/Time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // refatorando/ajustando/resentando ao Time normal e atual do Date depois de cada test(it)
    vi.useRealTimers()
  })

  it('should to be able to check in', async () => {
    // ainda não há regras de negócio no useCase, por isso o teste passará
    const { checkin } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.4441994,
      userLongitude: -46.3217671,
    })

    expect(checkin).toHaveProperty('id')
  })

  // aplicando TDD - Testing driven developer

  // Etapas TDD: red (faça o teste dar erro)
  // --> green(faça uma solução simples para o teste passar) --> refactor --> refatore e o aperfeiçoe

  it('should not to be able check in on the same day', async () => {
    // mocking Date

    const date = new Date(2023, 3, 6, 13, 20)

    vi.setSystemTime(date)

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.4441994,
      userLongitude: -46.3217671,
    })

    expect(async () => {
      await sut.execute({
        userId: 'user-id-1',
        gymId: 'gym-id-1',
        userLatitude: -23.4441994,
        userLongitude: -46.3217671,
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should to be able check in twice but in different days', async () => {
    // mocking Date
    // dia 6
    const date = new Date(2023, 3, 6, 13, 20)

    vi.setSystemTime(date)

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.4441994,
      userLongitude: -46.3217671,
    })

    // dia 7
    const differentDate = new Date(2023, 4, 7, 11, 10)

    vi.setSystemTime(differentDate)

    const { checkin } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.4441994,
      userLongitude: -46.3217671,
    })

    expect(checkin).toHaveProperty('id')
  })

  it('should not be able to check in max distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-id-2',
      title: 'Smart Fit 2',
      description: 'A Smart Fit is the best! 2',
      phone: '9814857648',
      latitude: -23.4382112,
      longitude: -46.3205717,
    })

    expect(async () => {
      await sut.execute({
        userId: 'user-id-1',
        gymId: 'gym-id-2',
        userLatitude: -23.4966183,
        userLongitude: -46.3488171,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })

  it('Should not be able create check-in if user id not exists.', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'invalid-user-id',
        gymId: 'gym-id-1',
        userLatitude: -23.4441994,
        userLongitude: -46.3217671,
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
