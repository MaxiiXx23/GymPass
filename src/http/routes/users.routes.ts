import { Router } from 'express'

import { registerController } from '@/http/controllers/register/registerController'
import { authenticateController } from '../controllers/authenticate/authenticateController'
import { profileController } from '../controllers/profile/profileController'

import { verifyToken } from '../middlewares/verifyToken'

const usersRoutes = Router()

usersRoutes.post('/', registerController)
usersRoutes.post('/sessions', authenticateController)
usersRoutes.get('/me', verifyToken, profileController)

export { usersRoutes }
