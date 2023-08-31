import { Schema, model } from 'mongoose'

export type Account = {
  email: string
}

export const accountSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
})

export const AccountM = model<Account>('Account', accountSchema)
