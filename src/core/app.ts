import express from 'express'
import config from 'config'

import * as interfaces from './interfaces'
import { AccountsController, AwardsController } from '../routes/controllers'
import * as middlewares from '../routes/middlewares'
import logger from '../utils/logger'

type serverConfig = {
  host: string
  port: number
}

export class App {
  private accountRepository: interfaces.AccountRepository
  private awardRepository: interfaces.AwardRepository
  private server: express.Express
  private serverCfg: serverConfig

  constructor(
    accountRepository: interfaces.AccountRepository,
    awardRepository: interfaces.AwardRepository
  ) {
    this.accountRepository = accountRepository
    this.awardRepository = awardRepository

    this.server = express()
    this.serverCfg = {
      host: config.get('app.server.host'),
      port: config.get('app.server.port'),
    }

    this.setupServer()
  }

  private setupServer() {
    this.server.use(express.json())

    const accountsPath = '/accounts'
    const accountsController = new AccountsController(this.accountRepository)
    this.server.use(accountsPath, accountsController.getRouter())

    const awardsPath = '/awards'
    const awardsController = new AwardsController(this.awardRepository)
    this.server.use(
      awardsPath,
      middlewares.authentication,
      awardsController.getRouter()
    )

    this.server.use(middlewares.routeNotFound)
    this.server.use(middlewares.error)
  }

  startServer(pid: number) {
    this.server.listen(this.serverCfg.port, this.serverCfg.host, () => {
      logger.info(
        `App is running on ${this.serverCfg.host}:${this.serverCfg.port}`,
        { message: JSON.stringify({ pid }) }
      )
    })
  }
}
