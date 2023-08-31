import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

export default (req: Request, res: Response, next: NextFunction) => {
  next(createError(404))
}
