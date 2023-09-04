import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import config from 'config'
import jwt from 'jsonwebtoken'

import * as interfaces from '../../core/interfaces'
import { defaultResponse, textResponse } from '../responses'
import { Account } from '../../models'

export class AccountsController {
  private accountRepository: interfaces.AccountRepository
  private router: Router

  constructor(accountRepository: interfaces.AccountRepository) {
    this.accountRepository = accountRepository

    this.router = Router({ mergeParams: true })

    this.router.post('/signin', this.signIn())
  }

  getRouter(): Router {
    return this.router
  }

  signIn() {
    return async (
      req: Request<null, null, Account, null>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const account = await this.accountRepository.get(req.body)
        if (!account) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json(textResponse('Email address does not exist', false))
        }

        const secret: string = config.get('app.secret')
        const token = jwt.sign({ email: account.email }, secret)

        const resp = defaultResponse({ token })

        res.status(StatusCodes.OK).json(resp)
      } catch (error) {
        next(error)
      }
    }
  }
}
