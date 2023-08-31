import cluster from 'node:cluster'
import process from 'node:process'

import { App } from '../src/core'
import { AccountRepository, AwardRepository } from '../src/repositories'
import * as mongo from '../src/mongodb'
import logger from '../src/utils/logger'

const numCPUs = 2 // or can also use `availableParallelism` from `node:os` library

let app: App

const start = async (pid: number) => {
  await mongo.connect()

  const accountRepository = new AccountRepository()
  const awardRepository = new AwardRepository()

  app = new App(accountRepository, awardRepository)

  app.startServer(pid)
}

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.info(`Worker ${worker.process.pid} died`)
  })
} else {
  start(process.pid)
}
