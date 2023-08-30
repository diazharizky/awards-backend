import config from 'config'
import express from 'express'
import util from 'util'

import middlewares from './middlewares'
import AwardsController from './controllers/awards'
import AccountsController from './controllers/accounts'

import AccountRepository from '../repositories/account'
import AwardRepository from '../repositories/award'

const accountRepository = new AccountRepository()
const awardRepository = new AwardRepository()

const app = express()

const setUpControllers = (): void => {
  const accountsPath = '/accounts'
  const accountsController = new AccountsController(accountRepository)
  app.use(accountsPath, accountsController.getRouter())

  const awardsPath = '/awards'
  const awardsController = new AwardsController(awardRepository)
  app.use(awardsPath, middlewares.authentication, awardsController.getRouter())
}

app.use(express.json())

setUpControllers()

app.use(middlewares.routeNotFound)
app.use(middlewares.error)

export const serve = (): void => {
  const host: string = config.get('app.host')
  const port: number = config.get('app.port')

  app.listen(port, host, () => {
    const addr = util.format('App is listening on %s:%s!', host, port)
    console.log(addr)
  })
}
