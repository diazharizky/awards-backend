import { Award, AwardTypeVoucher } from '../models'
import * as interfaces from '../core/interfaces'

export default class AwardRepository implements interfaces.AwardRepository {
  async list(): Promise<Award[]> {
    const awards: Award[] = [
      {
        id: '10b367be-312f-4014-a867-55ff9bb79ff0',
        name: 'Gift Card IDR 1.000.000',
        type: AwardTypeVoucher,
        point: 500000,
        thumbnailUrl: 'http://example.com',
      },
    ]

    return awards
  }
}
