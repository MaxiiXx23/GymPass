import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { ValidateCheckInUseCase } from './ValidateCheckInUseCase'

import { CheckInsRepositoryInMemory } from '@/http/repositories/checkinsRepository/in-memory/checkinsRepositoryInMemory'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkinsRepositoryInMemory: CheckInsRepositoryInMemory
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(() => {
    checkinsRepositoryInMemory = new CheckInsRepositoryInMemory()
    sut = new ValidateCheckInUseCase(checkinsRepositoryInMemory)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should to be able validate check-in', async () => {
    const newCheckIn = await checkinsRepositoryInMemory.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-id',
    })

    const { checkIn: checkInValidated } = await sut.execute({
      checkInId: newCheckIn.id,
    })

    expect(checkInValidated.validated_at).toEqual(expect.any(Date))
    expect(checkinsRepositoryInMemory.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('Should not be able validate check-in with wrong id', async () => {
    await checkinsRepositoryInMemory.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-id',
    })

    expect(async () => {
      await sut.execute({
        checkInId: 'check-in-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)

    expect(checkinsRepositoryInMemory.items[0].validated_at).toEqual(null)
  })

  it('Should not to be able validate check-in after 20 min of its creation', async () => {
    const date = new Date(2023, 3, 11, 14, 20)
    vi.setSystemTime(date)

    const newCheckIn = await checkinsRepositoryInMemory.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-id',
    })

    const twintyOneMinutesAfter = 1000 * 60 * 21

    vi.advanceTimersByTime(twintyOneMinutesAfter)

    expect(async () => {
      await sut.execute({
        checkInId: newCheckIn.id,
      })
    }).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
