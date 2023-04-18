import { Router } from 'express'

import { usersRoutes } from './users.routes'
import { gymsRoutes } from './gyms.routes'
import { verifyToken } from '../middlewares/verifyToken'
import { checkInsRoutes } from './checkIns.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/gyms', verifyToken, gymsRoutes)
routes.use('/check-ins', checkInsRoutes)

export { routes }
