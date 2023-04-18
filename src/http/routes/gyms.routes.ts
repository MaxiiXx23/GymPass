import { Router } from 'express'

import { createGymController } from '../controllers/gym/createGym/createGymController'
import { fetchNearbyGymsController } from '../controllers/gym/fetch-nearby-gyms/fetch-nearby-gyms-controller'
import { searchGymsController } from '../controllers/gym/search/searchGymsController'

const gymsRoutes = Router()

gymsRoutes.post('/', createGymController)
gymsRoutes.get('/nearby', fetchNearbyGymsController)
gymsRoutes.get('/search', searchGymsController)

export { gymsRoutes }
