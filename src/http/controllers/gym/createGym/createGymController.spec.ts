import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUserTest } from '@/utils/create-and-authenticate-user-test'

import { describe, it, expect } from 'vitest'

describe('Create Gym Controller e2e', () => {
  it('Should to be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUserTest(app, true)

    const response = await request(app)
      .post('/gyms/')
      .send({
        title: 'JavaScript Gym',
        description: 'The best JavaScript Gym of the World!',
        phone: '11985487540',
        latitude: -23.4361416,
        longitude: -46.319734,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toHaveProperty('gym')
  })
})
