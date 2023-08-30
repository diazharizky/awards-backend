import { Account } from '../models'
import * as interfaces from '../core/interfaces'

export default class AccountRepository implements interfaces.AccountRepository {
  async get(): Promise<Account> {
    return {
      id: '1fce7dc4-cf32-4045-8a71-76d6c208159b',
      email: 'foo@example.com',
    }
  }
}
