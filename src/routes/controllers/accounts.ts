import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as interfaces from '../../core/interfaces'
import { defaultResponse, textResponse } from '../responses'
import logger from '../../utils/logger'
import { Account } from '../../models'

export class AccountsController {
  private accountRepository: interfaces.AccountRepository
  private router: Router

  constructor(accountRepository: interfaces.AccountRepository) {
    this.accountRepository = accountRepository

    this.router = Router({ mergeParams: true })

    this.router.post('/signin', this.signIn())
    this.router.post('/signout', this.signOut())
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

        req.session.user = { account }

        const resp = defaultResponse({ account })

        res.status(StatusCodes.OK).json(resp)
      } catch (error) {
        next(error)
      }
    }
  }

  signOut() {
    return async (req: Request, res: Response) => {
      req.session.destroy((err) => {
        if (err && err instanceof Error) {
          logger.error('unable to destroy session', {
            message: JSON.stringify({
              error: err.message,
              stack: err.stack,
            }),
          })
        }
      })

      res.status(StatusCodes.OK).json(textResponse('Successfully logout'))
    }
  }
}
