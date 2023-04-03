import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

// prisma.user.create({
//   data: {
//     email: 'max.123@hotmail.com',
//     name: 'Max',
//   },
// })

export { app }
