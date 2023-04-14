import { NextFunction, Request, Response } from 'express'
import { makeGetUserProfileUseCase } from '../useCases/get-user-profile/factories/make-get-user-profile-use-case'
import { ResourceNotFoundError } from '../useCases/errors/resourceNotFoundError'

export async function profileController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user

  const getUserProfileUsecase = makeGetUserProfileUseCase()

  try {
    const { userMapped } = await getUserProfileUsecase.execute({
      userId: id,
    })

    return response.status(200).json({
      user: userMapped,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(401).json({ error: err.message })
    }
    response.status(500)
    return next(err)
  }
}
