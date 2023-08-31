/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { FatalResponse } from '../responses'

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(FatalResponse(err))
}
