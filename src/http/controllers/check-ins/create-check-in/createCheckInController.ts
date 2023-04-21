import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

import { makeCheckInUseCase } from '@/useCases/check-in/checkin/factories/make-check-in-use-case'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { MaxDistanceError } from '@/useCases/check-in/checkin/errors/maxDistanceError'
import { MaxNumberOfCheckInsError } from '@/useCases/check-in/checkin/errors/maxNumberOfCheckInsError'

export async function createCheckInController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkInBodySchema = z.object({
    userLatitude: z.number().refine((value: number) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value: number) => {
      return Math.abs(value) <= 180
    }),
  })

  const { id } = request.user

  try {
    const { gymId } = checkInParamsSchema.parse(request.params)
    const { userLatitude, userLongitude } = checkInBodySchema.parse(
      request.body,
    )

    const checkInUseCase = makeCheckInUseCase()

    const { checkin } = await checkInUseCase.execute({
      userId: id,
      gymId,
      userLatitude,
      userLongitude,
    })

    return response.status(201).json({ checkin })
  } catch (err) {
    if (
      err instanceof MaxDistanceError ||
      err instanceof ResourceNotFoundError
    ) {
      return response.status(400).json({ error: err.message })
    }

    if (err instanceof MaxNumberOfCheckInsError) {
      return response.status(401).json({ error: err.message })
    }

    response.status(500)
    return next(err)
  }
}
