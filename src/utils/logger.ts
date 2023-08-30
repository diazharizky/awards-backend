import { createLogger, transports, format } from 'winston'

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`
    })
  ),
})

const info = () => {
  logger.info('log info')
}

const error = () => {
  logger.error('log error')
}

export default {
  info,
  error,
}
