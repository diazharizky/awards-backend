import { FATAL_ERROR_MESSSAGE } from './messages'

export type Response = {
  ok: boolean
  data?: unknown
  error?: string
}

export const defaultResponse = (
  data: unknown,
  ok: boolean = true
): Response => ({ ok, data })

export const fatalResponse = (err: Error): Response => ({
  ok: false,
  data: FATAL_ERROR_MESSSAGE,
  error: err.message,
})

export const textResponse = (message: string, ok: boolean = true): Response =>
  defaultResponse({ message }, ok)
