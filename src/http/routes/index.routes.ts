import { Router } from 'express'

import { usersRoutes } from './users.routes'
import { gymsRoutes } from './gyms.routes'
import { checkInsRoutes } from './checkIns.routes'

import { verifyToken } from '../middlewares/verifyToken'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/gyms', verifyToken, gymsRoutes)
routes.use('/check-ins', checkInsRoutes)

export { routes }
