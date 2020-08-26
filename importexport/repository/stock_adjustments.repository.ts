import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { StockAdjustments } from '../models'
import { QueryStockAdjustments } from '../interface'

@injectable()
export class StockAdjustmentsRepository extends TypeOrmBaseRepository<
  StockAdjustments,
  QueryStockAdjustments,
  StockAdjustments
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.STOCK_ADJUSTMENTS
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(StockAdjustments.name)
  }
}
