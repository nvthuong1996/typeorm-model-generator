import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { ProductTransfersItem } from '../models'
import { QueryProductTransfersItem } from '../interface'

@injectable()
export class ProductTransfersItemRepository extends TypeOrmBaseRepository<
  ProductTransfersItem,
  QueryProductTransfersItem,
  ProductTransfersItem
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.PRODUCT_TRANSFERS_ITEM
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(ProductTransfersItem.name)
  }
}
