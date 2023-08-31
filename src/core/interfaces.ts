import { Account, Award, AwardFilter, AccountFilter } from '../models'

export interface AccountRepository {
  get(filter: AccountFilter): Promise<Account | null>
}

export interface AwardRepository {
  list(filter: AwardFilter): Promise<Award[]>
}
