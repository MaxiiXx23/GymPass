import { Request, Response, NextFunction } from 'express'

import { makeGetUserMetricsUseCase } from '@/useCases/get-user-metrics/factories/make-get-user-metrics-use-case'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'

export async function metricsController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  try {
    const { countCheckIns } = await getUserMetricsUseCase.execute({
      userId: id,
    })
    return response.status(200).json({ countCheckIns })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(400).json({ error: err.message })
    }

    response.status(500)
    return next(err)
  }
}
