import config from 'config'
import util from 'util'
import process from 'node:process'
import mongoose from 'mongoose'

import logger from '../utils/logger'

const host: string = config.get('mongo.host')
const port: string = config.get('mongo.port')
const database: string = config.get('mongo.database')

const uri = util.format('mongodb://%s:%s/%s', host, port, database)

export const connect = async () => {
  try {
    await mongoose.connect(uri)
  } catch (err) {
    const meta: { error: string; stack?: string } = {
      error: 'unexpected error',
    }

    if (err instanceof Error) {
      meta.error = err.message
      meta.stack = err.stack
    }

    logger.error('unable to resolve database connection', {
      message: JSON.stringify(meta),
    })

    process.exit(0)
  }
}
