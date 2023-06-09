import express from 'express'
import cookieParser from 'cookie-parser'

import { routes } from '@/http/routes/index.routes'
import { errorHandler } from '@/http/errors/errorHandler'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use(routes)

app.use(errorHandler)
export { app }
