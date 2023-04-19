import request from 'supertest'

import { describe, it, expect } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUserTest } from '@/utils/create-and-authenticate-user-test'
import { prisma } from '@/lib/prisma'

describe('Create Check-in Controller (e2e)', () => {
  it('Should to be able create a check-in', async () => {
    const { token } = await createAndAuthenticateUserTest(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'The best JavaScript Gym of the World!',
        phone: '11985487540',
        latitude: -23.4361416,
        longitude: -46.319734,
      },
    })

    const response = await request(app)
      .post(`/check-ins/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -23.4361416,
        userLongitude: -46.319734,
      })

    expect(response.statusCode).toEqual(201)
  })
})
