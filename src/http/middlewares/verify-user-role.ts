import { Request, Response, NextFunction } from 'express'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return (request: Request, response: Response, next: NextFunction) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return response.status(401).json({ error: 'Anauthorized.' })
    }

    return next()
  }
}
