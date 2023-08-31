import { App } from '../src/core'
import { AccountRepository, AwardRepository } from '../src/repositories'
import * as mongo from '../src/mongodb'

let app: App

const start = async () => {
  await mongo.connect()

  const accountRepository = new AccountRepository()
  const awardRepository = new AwardRepository()

  app = new App(accountRepository, awardRepository)

  app.startServer()
}

start()
