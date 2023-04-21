import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { makeFetchNearbyGymsUseCase } from '@/useCases/gym/fetch-nearby-gyms/factories/make-fetch-nearby-gyms-use-case'

export async function fetchNearbyGymsController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const fetchNearbyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    latitude: z.coerce.number().refine((value: number) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value: number) => {
      return Math.abs(value) <= 180
    }),
  })

  try {
    const { page, latitude, longitude } = fetchNearbyQuerySchema.parse(
      request.query,
    )

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
      page,
    })

    return response.status(200).json(gyms)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(401).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
