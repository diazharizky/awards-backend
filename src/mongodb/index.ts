import config from 'config'
import util from 'util'
import process from 'process'
import mongoose from 'mongoose'

const host: string = config.get('mongo.host')
const port: string = config.get('mongo.port')
const database: string = config.get('mongo.database')

const uri = util.format('mongodb://%s:%s/%s', host, port, database)

export const connect = async () => {
  try {
    await mongoose.connect(uri)
  } catch (err) {
    console.log('error unable to resolve database connection')

    process.exit(0)
  }
}
