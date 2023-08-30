import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

export default (_: Request, res: Response, next: NextFunction): void => {
  next(createError(404))
}
