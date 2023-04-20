import { Router } from 'express'

import { createCheckInController } from '../controllers/check-ins/create-check-in/createCheckInController'
import { fetchUserCheckInsHistoryController } from '../controllers/check-ins/fetch-user-check-ins-history/fetch-user-check-ins-history-controller'
import { verifyToken } from '../middlewares/verifyToken'
import { validateCheckInController } from '../controllers/check-ins/validate-check-in/validateCheckInController'
import { metricsController } from '../controllers/check-ins/metrics/metricsController'
import { verifyUserRole } from '../middlewares/verify-user-role'

const checkInsRoutes = Router()

checkInsRoutes.post('/:gymId/check-in', verifyToken, createCheckInController)

checkInsRoutes.get(
  '/history/:page',
  verifyToken,
  fetchUserCheckInsHistoryController,
)

checkInsRoutes.get('/metrics', verifyToken, metricsController)

checkInsRoutes.patch(
  '/:checkInId/validate',
  verifyToken,
  verifyUserRole('ADMIN'),
  validateCheckInController,
)

export { checkInsRoutes }
