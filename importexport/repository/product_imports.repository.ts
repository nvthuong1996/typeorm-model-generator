import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { ProductImports } from '../models'
import { QueryProductImports } from '../interface'

@injectable()
export class ProductImportsRepository extends TypeOrmBaseRepository<
  ProductImports,
  QueryProductImports,
  ProductImports
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.PRODUCT_IMPORTS
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(ProductImports.name)
  }
}
