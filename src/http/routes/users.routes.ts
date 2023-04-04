import { Router } from 'express'
import { registerController } from '@/http/controllers/registerController'

const usersRoutes = Router()

usersRoutes.post('/', registerController)

export { usersRoutes }
