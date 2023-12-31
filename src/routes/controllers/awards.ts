import { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as interfaces from '../../core/interfaces'
import { defaultResponse } from '../responses'
import { AwardFilter } from '../../models'

export class AwardsController {
  private awardRepository: interfaces.AwardRepository
  private router: Router

  constructor(awardRepository: interfaces.AwardRepository) {
    this.awardRepository = awardRepository

    this.router = Router({ mergeParams: true })

    this.router.get('/', this.list())
  }

  getRouter(): Router {
    return this.router
  }

  list() {
    return async (
      req: Request<null, null, null, AwardFilter>,
      res: Response
    ) => {
      const filter = req.query

      const awards = await this.awardRepository.list(filter)

      const resp = defaultResponse({ awards })

      res.status(StatusCodes.OK).json(resp)
    }
  }
}
