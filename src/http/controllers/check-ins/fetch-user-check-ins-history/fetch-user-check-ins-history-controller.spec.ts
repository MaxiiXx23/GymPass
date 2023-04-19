import request from 'supertest'
import { describe, it, expect } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '@/app'
import { createAndAuthenticateUserTest } from '@/utils/create-and-authenticate-user-test'

describe('Fetch User Check-ins History Controller (e2e)', () => {
  it('Should to be able fetch user check-ins history', async () => {
    const { token, userId } = await createAndAuthenticateUserTest(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'The best JavaScript Gym of the World!',
        phone: '11985487540',
        latitude: -23.4361416,
        longitude: -46.319734,
      },
    })

    await prisma.checkin.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: userId,
        },
        {
          gym_id: gym.id,
          user_id: userId,
        },
      ],
    })

    const response = await request(app)
      .get(`/check-ins/history/${1}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: userId,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: userId,
      }),
    ])
  })
})
