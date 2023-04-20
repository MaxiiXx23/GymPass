import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { auth } from '@/config/auth'
import { IPayloadDTO } from '@/dtos/PayloadDTO'

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(401).json({ error: 'ID user missing.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId, role } = verify(
      token,
      auth.secret_key_JWT,
    ) as IPayloadDTO
    request.user = {
      id: userId,
      role,
    }

    return next()
  } catch (error) {
    const { message } = error as Error
    return response.status(401).json({ error: message })
  }
}
