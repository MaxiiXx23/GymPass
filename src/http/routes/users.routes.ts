import { Router } from 'express'

import { registerController } from '../controllers/user/register/registerController'
import { authenticateController } from '../controllers/user/authenticate/authenticateController'
import { profileController } from '../controllers/user/profile/profileController'

import { verifyToken } from '../middlewares/verifyToken'
import { refreshTokenController } from '../controllers/user/refreshToken/refreshTokenController'

const usersRoutes = Router()

usersRoutes.post('/', registerController)
usersRoutes.post('/sessions', authenticateController)
usersRoutes.get('/me', verifyToken, profileController)
usersRoutes.patch('/token/refresh', refreshTokenController)

export { usersRoutes }
