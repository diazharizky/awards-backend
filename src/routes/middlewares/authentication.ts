import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  next()
}
