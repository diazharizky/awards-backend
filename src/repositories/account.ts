import * as interfaces from '../core/interfaces'
import { Account, AccountM, AccountFilter } from '../models'

export class AccountRepository implements interfaces.AccountRepository {
  async get(filter: AccountFilter): Promise<Account | null> {
    return await AccountM.findOne(filter)
  }
}
