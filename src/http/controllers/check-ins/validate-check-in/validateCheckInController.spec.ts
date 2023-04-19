import request from 'supertest'
import { describe, it, expect } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '@/app'
import { createAndAuthenticateUserTest } from '@/utils/create-and-authenticate-user-test'

describe('Validate Check-in Controller (e2e)', () => {
  it('Should to be able to validate check-in', async () => {
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

    let checkIn = await prisma.checkin.create({
      data: {
        gym_id: gym.id,
        user_id: userId,
      },
    })

    const response = await request(app)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)

    checkIn = await prisma.checkin.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
