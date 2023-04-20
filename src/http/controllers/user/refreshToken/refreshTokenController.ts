import { NextFunction, Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'

import { auth } from '@/config/auth'
import { IPayloadDTO } from '@/dtos/PayloadDTO'

export async function refreshTokenController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { sub: userId } = verify(
      // Para setar a interface 'cookies' é no arquivo de tipagem do cookieParser,
      // para acessar bastar da control + click em 'coockies'
      request.cookies.refreshToken,
      auth.secret_key_JWT,
    ) as IPayloadDTO
    request.user = {
      id: userId,
    }

    const token = sign({}, auth.secret_key_JWT, {
      subject: userId,
      expiresIn: auth.experies_in_JWT,
    })

    const refreshToken = sign({}, auth.secret_key_JWT, {
      subject: userId,
      expiresIn: auth.experies_in_JWT,
    })

    return response
      .cookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
        signed: false,
      })
      .status(200)
      .json({ token })
  } catch (err) {
    response.status(500)
    return next(err)
  }
}
