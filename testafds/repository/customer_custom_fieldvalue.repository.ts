import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { CustomerCustomFieldvalue } from '../models'
import { QueryCustomerCustomFieldvalue } from '../interface'

@injectable()
export class CustomerCustomFieldvalueRepository extends TypeOrmBaseRepository<
  CustomerCustomFieldvalue,
  QueryCustomerCustomFieldvalue,
  CustomerCustomFieldvalue
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.CUSTOMER_CUSTOM_FIELDVALUE
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor() {
    super()
    this.db = getConnection(C.SERVICE_NAME.CUSTOMER_CUSTOM_FIELDVALUE).getRepository(
      CustomerCustomFieldvalue,
    )
  }
}
