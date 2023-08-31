/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { fatalResponse } from '../responses'

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(fatalResponse(err))
}
