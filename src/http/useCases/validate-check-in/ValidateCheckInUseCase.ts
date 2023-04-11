import { Checkin } from '@prisma/client'
import dayjs from 'dayjs'

import { ICheckInsRepository } from '@/http/repositories/checkinsRepository/ICheckInsRespository'
import { ResourceNotFoundError } from '../errors/resourceNotFoundError'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface IRequest {
  checkInId: string
}

interface IResponse {
  checkIn: Checkin
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ checkInId }: IRequest): Promise<IResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    const checkInValidated = await this.checkInsRepository.save(checkIn)

    return {
      checkIn: checkInValidated,
    }
  }
}
