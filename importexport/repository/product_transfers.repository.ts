import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { ProductTransfers } from '../models'
import { QueryProductTransfers } from '../interface'

@injectable()
export class ProductTransfersRepository extends TypeOrmBaseRepository<
  ProductTransfers,
  QueryProductTransfers,
  ProductTransfers
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.PRODUCT_TRANSFERS
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(ProductTransfers.name)
  }
}
