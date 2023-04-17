import request from 'supertest'
import { describe, it, expect } from 'vitest'

import { app } from '@/app'

describe('Authenticate e2e', () => {
  it('Should to be able authenticate user', async () => {
    await request(app).post('/users').send({
      email: 'johndoe@testing.com',
      name: 'John Doe',
      password: '123456testing',
    })

    const response = await request(app).post('/users/sessions').send({
      email: 'johndoe@testing.com',
      password: '123456testing',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
