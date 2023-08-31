import { Schema, model } from 'mongoose'

type AwardType = string

export type Award = {
  name: string
  type: AwardType
  point: number
  thumbnailUrl?: string
}

export type AwardFilter = Partial<Pick<Award, 'type'>> & {
  minPoint?: number
  maxPoint?: number
}

export const AwardTypeVoucher: AwardType = 'voucher'
export const AwardTypeProduct: AwardType = 'product'
export const AwardTypeGiftcard: AwardType = 'giftcard'

export const awardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [AwardTypeVoucher, AwardTypeProduct, AwardTypeGiftcard],
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
})

awardSchema.index({ type: 1, point: 1 })

export const AwardM = model<Award>('Award', awardSchema)
