import { Request, Response, NextFunction } from 'express'
import { FATAL_ERROR_MESSSAGE } from '../responses/messages'

export default (err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err != null) {
    return res.status(500).send(FATAL_ERROR_MESSSAGE)
  }

  next()
}
