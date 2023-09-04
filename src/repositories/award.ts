import { Award, AwardM, AwardFilter } from '../models'
import * as interfaces from '../core/interfaces'

type ParsedFilter = {
  type?: object
  point?: object
}

export class AwardRepository implements interfaces.AwardRepository {
  async list(filter: AwardFilter): Promise<Award[]> {
    const awards: Award[] = []

    const parsedFilter = this.parseFilter(filter)
    for await (const aw of AwardM.find(parsedFilter)) {
      awards.push(aw)
    }

    return awards
  }

  parseFilter(filter: AwardFilter): ParsedFilter {
    let parsedFilter: ParsedFilter = {}

    if (filter.type) {
      parsedFilter = {
        ...parsedFilter,
        type: {
          $in: filter.type.split(','),
        },
      }
    }

    if (filter.minPoint) {
      parsedFilter = {
        ...parsedFilter,
        point: {
          ...parsedFilter.point,
          $gte: filter.minPoint,
        },
      }
    }

    if (filter.maxPoint) {
      parsedFilter = {
        ...parsedFilter,
        point: {
          ...parsedFilter.point,
          $lte: filter.maxPoint,
        },
      }
    }

    return parsedFilter
  }
}
