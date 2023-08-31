import express from 'express'
import session from 'express-session'
import config from 'config'
import util from 'util'

import * as interfaces from './interfaces'
import { AccountsController, AwardsController } from '../routes/controllers'
import * as middlewares from '../routes/middlewares'
import { UserSession } from '../models'

declare module 'express-session' {
  interface SessionData {
    user: UserSession
  }
}

type serverConfig = {
  host: string
  port: number
}

export class App {
  private accountRepository: interfaces.AccountRepository
  private awardRepository: interfaces.AwardRepository
  private server: express.Express
  private secret: string
  private serverCfg: serverConfig

  constructor(
    accountRepository: interfaces.AccountRepository,
    awardRepository: interfaces.AwardRepository
  ) {
    this.accountRepository = accountRepository
    this.awardRepository = awardRepository

    this.server = express()
    this.secret = config.get('app.secret')
    this.serverCfg = {
      host: config.get('app.server.host'),
      port: config.get('app.server.port'),
    }

    this.setupServer()
  }

  private setupServer() {
    this.server.use(express.json())
    this.server.use(
      session({
        secret: this.secret,
        resave: false,
        saveUninitialized: true,
      })
    )

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

  startServer() {
    this.server.listen(this.serverCfg.port, this.serverCfg.host, () => {
      const addr = util.format(
        'App is listening on %s:%s!',
        this.serverCfg.host,
        this.serverCfg.port
      )

      console.log(addr)
    })
  }
}
