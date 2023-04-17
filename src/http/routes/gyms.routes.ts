import { Router } from 'express'

import { createGymController } from '../controllers/gym/createGym/createGymController'
import { fetchNearbyGymsController } from '../controllers/gym/fetch-nearby-gyms/fectch-nearby-gyms-controller'
import { searchGymsController } from '../controllers/gym/search/searchGymsController'

const gymsRoutes = Router()

gymsRoutes.post('/', createGymController)
gymsRoutes.post('/nearby', fetchNearbyGymsController)
gymsRoutes.post('/search', searchGymsController)

export { gymsRoutes }
