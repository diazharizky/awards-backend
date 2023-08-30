import { Account, Award } from '../models'

export interface AccountRepository {
  get(): Promise<Account>
}

export interface AwardRepository {
  list(): Promise<Award[]>
}
