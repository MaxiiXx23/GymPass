import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { makeFetchUserCheckInsHistoryUseCase } from '@/useCases/check-in/fetch-user-check-ins-historty/factories/make-fetch-user-check-ins-history-use-case'

export async function fetchUserCheckInsHistoryController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const fetchCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { id } = request.user

  try {
    const { page } = fetchCheckInsQuerySchema.parse(request.params)

    const fetchUserCheckInsHistoryUseCase =
      makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: id,
      page,
    })

    return response.status(200).json({ checkIns })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(400).json({ error: err.message })
    }

    response.status(500)
    return next(err)
  }
}
