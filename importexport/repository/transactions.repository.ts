import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { Transactions } from '../models'
import { QueryTransactions } from '../interface'

@injectable()
export class TransactionsRepository extends TypeOrmBaseRepository<
  Transactions,
  QueryTransactions,
  Transactions
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.TRANSACTIONS
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor(connectionName: string) {
    super()
    this.db = getConnection(connectionName).getRepository(Transactions.name)
  }
}
