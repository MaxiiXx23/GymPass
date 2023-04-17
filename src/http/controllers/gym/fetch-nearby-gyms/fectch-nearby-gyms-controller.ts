import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { makeFetchNearbyGymsUseCase } from '@/useCases/fetch-nearby-gyms/factories/make-fetch-nearby-gyms-use-case'

export async function fetchNearbyGymsController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const fetchNearbySchema = z.object({
    userLatitude: z.number().refine((value: number) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value: number) => {
      return Math.abs(value) <= 180
    }),
    page: z.coerce.number().min(1).default(1),
  })

  try {
    const data = fetchNearbySchema.parse(request.body)

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute(data)

    return response.status(200).json(gyms)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(401).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
