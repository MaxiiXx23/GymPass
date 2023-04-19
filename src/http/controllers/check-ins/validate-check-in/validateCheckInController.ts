import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { makeValidateCheckInUseCase } from '@/useCases/validate-check-in/factories/make-validate-check-in-use-case'
import { LateCheckInValidationError } from '@/useCases/validate-check-in/errors/late-check-in-validation-error'

export async function validateCheckInController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const validateParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  try {
    const { checkInId } = validateParamsSchema.parse(request.params)

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    const { checkIn } = await validateCheckInUseCase.execute({ checkInId })

    return response.status(200).json({ checkIn })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(400).json({ error: err.message })
    }

    if (err instanceof LateCheckInValidationError) {
      return response.status(400).json({ error: err.message })
    }

    response.status(500)
    return next(err)
  }
}
