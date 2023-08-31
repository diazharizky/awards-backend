import { Account } from '../models'
import * as interfaces from '../core/interfaces'
import { AccountM } from '../models'

export class AccountRepository implements interfaces.AccountRepository {
  async get(): Promise<Account | null> {
    const account = await AccountM.findOne()
    return account
  }
}
