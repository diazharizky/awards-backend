import { Router, Request, Response } from 'express'

import * as interfaces from '../../core/interfaces'
import { DefaultResponse } from '../responses'

export default class AwardsController {
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
    return async (_: Request, res: Response) => {
      const awards = await this.awardRepository.list()

      const resp = DefaultResponse(awards)

      res.status(200).json(resp)
    }
  }
}
