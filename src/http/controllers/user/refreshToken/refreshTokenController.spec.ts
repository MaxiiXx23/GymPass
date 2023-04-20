import request from 'supertest'
import { describe, it, expect } from 'vitest'

import { app } from '@/app'

describe('Refresh Token Controller (e2e)', () => {
  it('Should to be able generate Refresh Token', async () => {
    await request(app).post('/users/').send({
      name: 'John Doe',
      email: 'johndoe@testing.com',
      password: '123456',
    })

    const authResponse = await request(app).post('/users/sessions').send({
      email: 'johndoe@testing.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app)
      .patch('/users/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
