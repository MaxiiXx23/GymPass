import { Router } from 'express'
import { registerController } from '@/http/controllers/registerController'
import { authenticateController } from '@/http/controllers/authenticateController'

const usersRoutes = Router()

usersRoutes.post('/', registerController)
usersRoutes.post('/sessions', authenticateController)

export { usersRoutes }
