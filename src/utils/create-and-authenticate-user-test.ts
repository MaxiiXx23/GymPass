import request from 'supertest'
import { Express } from 'express'

import { verify } from 'jsonwebtoken'
import { auth } from '@/config/auth'

interface IPayload {
  sub: string
}

export async function createAndAuthenticateUserTest(app: Express) {
  await request(app).post('/users').send({
    email: 'johndoe@testing.com',
    name: 'John Doe',
    password: '123456testing',
  })

  const authResponse = await request(app).post('/users/sessions').send({
    email: 'johndoe@testing.com',
    password: '123456testing',
  })

  const { token } = authResponse.body

  const { sub: userId } = verify(token, auth.secret_key_JWT) as IPayload

  return {
    token,
    userId,
  }
}
