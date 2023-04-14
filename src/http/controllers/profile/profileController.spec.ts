import request from 'supertest'
import { describe, it, expect } from 'vitest'

import { app } from '@/app'

describe('Profile (e2e)', () => {
  it('Should to be able get profile user', async () => {
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

    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toHaveProperty('id')
  })
})
