import request from 'supertest'
import { Express } from 'express'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

import { verify } from 'jsonwebtoken'
import { auth } from '@/config/auth'

interface IPayload {
  sub: string
}

export async function createAndAuthenticateUserTest(
  app: Express,
  isAdmin = false,
) {
  const passwordHashed = await hash('123456', 6)

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@testing.com',
      password_hash: passwordHashed,
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app).post('/users/sessions').send({
    email: 'johndoe@testing.com',
    password: '123456',
  })

  const { token } = authResponse.body

  const { sub: userId } = verify(token, auth.secret_key_JWT) as IPayload

  return {
    token,
    userId,
  }
}
