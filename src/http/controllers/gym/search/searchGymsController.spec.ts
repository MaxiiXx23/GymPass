import request from 'supertest'

import { describe, it, expect } from 'vitest'

import { app } from '@/app'

import { createAndAuthenticateUserTest } from '@/utils/create-and-authenticate-user-test'

describe('Search Gyms Controller (e2e)', () => {
  it('Should to be able search gyms by title', async () => {
    const { token } = await createAndAuthenticateUserTest(app)

    await request(app)
      .post('/gyms/')
      .send({
        title: 'TypeScript Gym',
        description: 'The best TypeScript Gym of the World!',
        phone: '11985487540',
        latitude: -23.4361416,
        longitude: -46.319734,
      })
      .set('Authorization', `Bearer ${token}`)

    await request(app)
      .post('/gyms/')
      .send({
        title: 'JavaScript Gym',
        description: 'The best JavaScript Gym of the World!',
        phone: '11985487540',
        latitude: -23.4409745,
        longitude: -46.3215031,
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app)
      .get('/gyms/search')
      .query({
        q: 'Gym',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
