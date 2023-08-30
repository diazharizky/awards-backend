type AwardType = string

export const AwardTypeVoucher: AwardType = 'voucher'
export const AwardTypeProduct: AwardType = 'product'
export const AwardTypeGiftcard: AwardType = 'giftcard'

export type Account = {
  id: string
  email: string
}

export type Award = {
  id: string
  name: string
  type: AwardType
  point: number
  thumbnailUrl: string
}
