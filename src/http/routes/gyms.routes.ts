import { Router } from 'express'

import { createGymController } from '../controllers/gym/createGym/createGymController'
import { fetchNearbyGymsController } from '../controllers/gym/fetch-nearby-gyms/fetch-nearby-gyms-controller'
import { searchGymsController } from '../controllers/gym/search/searchGymsController'
import { verifyUserRole } from '../middlewares/verify-user-role'

const gymsRoutes = Router()

gymsRoutes.post('/', verifyUserRole('ADMIN'), createGymController)
gymsRoutes.get('/nearby', fetchNearbyGymsController)
gymsRoutes.get('/search', searchGymsController)

export { gymsRoutes }
