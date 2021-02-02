import { IAccountModel } from '../../../../domain/models/IAccountModel'

export const map = (account: any): IAccountModel => {
  const { _id, ...accountWithoutId } = account

  return Object.assign({}, accountWithoutId, { id: _id })
}
