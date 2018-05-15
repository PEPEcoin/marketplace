import { server } from 'decentraland-commons'

import { Publication } from './Publication.model'

const ALLOWED_VALUES = Object.freeze({
  price: ['ASC'],
  created_at: ['DESC'],
  block_time_updated_at: ['DESC'],
  expires_at: ['ASC']
})

export class PublicationRequestFilters {
  static getAllowedValues() {
    return ALLOWED_VALUES
  }

  constructor(req) {
    this.req = req
  }

  sanitize(req) {
    let status = this.getReqParam('status')
    let by = this.getReqParam('sort_by')
    let order = this.getReqParam('sort_order')
    let limit = this.getReqParam('limit')
    let offset = this.getReqParam('offset')
    let type = this.getReqParam('type')

    status = Publication.isValidStatus(status)
      ? status
      : Publication.STATUS.open
    by = by in ALLOWED_VALUES ? by : 'created_at'
    order = ALLOWED_VALUES[by].includes(order.toUpperCase())
      ? order
      : ALLOWED_VALUES[by][0]
    limit = Math.max(Math.min(100, limit), 0)
    offset = Math.max(offset, 0)
    type = Publication.isValidType(type) ? type : Publication.TYPES.parcel

    return {
      status,
      type,
      sort: {
        by,
        order
      },
      pagination: {
        limit,
        offset
      }
    }
  }

  getReqParam(name) {
    return server.extractFromReq(this.req, name)
  }
}
