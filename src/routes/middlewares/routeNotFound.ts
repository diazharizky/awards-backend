/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export default (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.NOT_FOUND)
}
