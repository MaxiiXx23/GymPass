import request from 'supertest'
import { describe, it, expect } from 'vitest'

import { app } from '@/app'

describe('Register (e2e)', () => {
  it('Should to be able to register', async () => {
    const response = await request(app).post('/users').send({
      email: 'johndoe@testing.com',
      name: 'John Doe',
      password: '123456testing',
    })

    expect(response.statusCode).toEqual(201)
  })
})
