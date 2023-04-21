import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { makeSearchGymsUseCase } from '@/useCases/gym/search-fetch-gyms/factories/make-search-gyms-use-case'

export async function searchGymsController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const searchQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  try {
    const { q, page } = searchQuerySchema.parse(request.query)
    const searchGymsUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
      query: q,
      page,
    })

    return response.status(200).json(gyms)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(401).json({ error: err.message })
    }

    response.status(500)
    next(err)
  }
}
