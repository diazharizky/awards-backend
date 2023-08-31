import { Account, Award, AwardFilter } from '../models'

export interface AccountRepository {
  get(): Promise<Account | null>
}

export interface AwardRepository {
  list(filter: AwardFilter): Promise<Award[]>
}
