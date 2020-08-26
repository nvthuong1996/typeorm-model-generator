import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { ProductExportItem } from '../models'
import { QueryProductExportItem } from '../interface'

@injectable()
export class ProductExportItemRepository extends TypeOrmBaseRepository<
  ProductExportItem,
  QueryProductExportItem,
  ProductExportItem
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.PRODUCT_EXPORT_ITEM
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(ProductExportItem.name)
  }
}
