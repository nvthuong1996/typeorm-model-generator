import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { CustomerNote } from '../models'
import { QueryCustomerNote } from '../interface'

@injectable()
export class CustomerNoteRepository extends TypeOrmBaseRepository<
  CustomerNote,
  QueryCustomerNote,
  CustomerNote
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.CUSTOMER_NOTE
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor() {
    super()
    this.db = getConnection(C.SERVICE_NAME.CUSTOMER_NOTE).getRepository(CustomerNote)
  }
}
