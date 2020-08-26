import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { ProductExports } from '../models'
import { QueryProductExports } from '../interface'

@injectable()
export class ProductExportsRepository extends TypeOrmBaseRepository<
  ProductExports,
  QueryProductExports,
  ProductExports
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.PRODUCT_EXPORTS
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(ProductExports.name)
  }
}
