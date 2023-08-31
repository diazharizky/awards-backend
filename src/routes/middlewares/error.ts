/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'
import { FatalResponse } from '../responses'

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resp = FatalResponse(err)
  res.status(500).send(resp)
}
