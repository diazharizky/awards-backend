import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import config from 'config'

export default (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  try {
    const token = bearerToken?.split(' ')[1]
    const secret: string = config.get('app.secret')!
    jwt.verify(token, secret)
  } catch (err) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  next()
}
