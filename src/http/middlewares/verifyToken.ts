import { Request, Response, NextFunction } from 'express'

import { auth } from '@/config/auth'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

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
    const { sub: userId } = verify(token, auth.secret_key_JWT) as IPayload
    request.user = {
      id: userId,
    }

    return next()
  } catch (error) {
    const { message } = error as Error
    return response.status(401).json({ error: message })
  }
}
