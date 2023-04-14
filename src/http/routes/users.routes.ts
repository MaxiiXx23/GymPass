import { Router } from 'express'

import { registerController } from '@/http/controllers/registerController'
import { authenticateController } from '@/http/controllers/authenticateController'
import { profileController } from '../controllers/profileController'

import { verifyToken } from '../middlewares/verifyToken'

const usersRoutes = Router()

usersRoutes.post('/', registerController)
usersRoutes.post('/sessions', authenticateController)
usersRoutes.get('/me', verifyToken, profileController)

export { usersRoutes }
