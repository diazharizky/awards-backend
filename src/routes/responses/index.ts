import { FATAL_ERROR_MESSSAGE } from './messages'

export type Response = {
  ok: boolean
  data?: unknown
  error?: string
}

export const DefaultResponse = (data: unknown): Response => ({
  ok: true,
  data,
})

export const FatalResponse = (err: Error): Response => ({
  ok: false,
  data: FATAL_ERROR_MESSSAGE,
  error: err.message,
})
