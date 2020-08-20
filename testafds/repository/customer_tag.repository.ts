import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { CustomerTag } from '../models'
import { QueryCustomerTag } from '../interface'

@injectable()
export class CustomerTagRepository extends TypeOrmBaseRepository<
  CustomerTag,
  QueryCustomerTag,
  CustomerTag
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.CUSTOMER_TAG
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor() {
    super()
    this.db = getConnection(C.SERVICE_NAME.CUSTOMER_TAG).getRepository(CustomerTag)
  }
}
