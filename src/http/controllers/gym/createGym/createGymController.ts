import { Request, Response, NextFunction } from 'express'

import { z } from 'zod'

import { makeCreateGymUseCase } from '@/useCases/createGym/factories/make-create-gym-use-case'
import { GymAlreadyExistsError } from '@/useCases/createGym/errors/GymAlreadyExistsError'

export async function createGymController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const gymSchema = z.object({
    title: z.string().max(60),
    description: z.string().max(200).nullable(),
    phone: z.string().max(200).nullable(),
    latitude: z.number().refine((value: number) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value: number) => {
      return Math.abs(value) <= 180
    }),
  })

  try {
    const data = gymSchema.parse(request.body)

    const createGymUseCase = makeCreateGymUseCase()

    const gym = await createGymUseCase.execute(data)

    return response.status(201).json(gym)
  } catch (err) {
    if (err instanceof GymAlreadyExistsError) {
      return response.status(409).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
