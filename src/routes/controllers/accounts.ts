import { Router, Request, Response } from 'express'

import * as interfaces from '../../core/interfaces'
import { DefaultResponse } from '../responses'

export default class AccountsController {
  private accountRepository: interfaces.AccountRepository
  private router: Router

  constructor(accountRepository: interfaces.AccountRepository) {
    this.accountRepository = accountRepository

    this.router = Router({ mergeParams: true })

    this.router.get('/signin', this.get())
  }

  getRouter(): Router {
    return this.router
  }

  get() {
    return async (_: Request, res: Response) => {
      const account = await this.accountRepository.get()

      const resp = DefaultResponse(account)

      res.status(200).json(resp)
    }
  }
}
