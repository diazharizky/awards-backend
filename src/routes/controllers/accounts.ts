import { Router, Request, Response, NextFunction } from 'express'

import * as interfaces from '../../core/interfaces'
import { DefaultResponse } from '../responses'
import { StatusCodes } from 'http-status-codes'

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
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const account = await this.accountRepository.get()
        if (!account) {
          return res.sendStatus(StatusCodes.UNAUTHORIZED)
        }

        req.session.user = { account }

        const resp = DefaultResponse(account)

        res.status(200).json(resp)
      } catch (error) {
        next(error)
      }
    }
  }

  signOut() {
    return async (req: Request, res: Response) => {
      req.session.destroy((err) => {
        if (err) {
          console.log('error unable to destroy session', err)
        }
      })

      const resp = DefaultResponse({
        message: 'Successfully logout',
      })

      res.status(200).json(resp)
    }
  }
}
