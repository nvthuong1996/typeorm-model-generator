import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { ProductImportItem } from '../models'
import { QueryProductImportItem } from '../interface'

@injectable()
export class ProductImportItemRepository extends TypeOrmBaseRepository<
  ProductImportItem,
  QueryProductImportItem,
  ProductImportItem
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.PRODUCT_IMPORT_ITEM
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(ProductImportItem.name)
  }
}
