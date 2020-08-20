import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { CustomerCustomField } from '../models'
import { QueryCustomerCustomField } from '../interface'

@injectable()
export class CustomerCustomFieldRepository extends TypeOrmBaseRepository<
  CustomerCustomField,
  QueryCustomerCustomField,
  CustomerCustomField
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.CUSTOMER_CUSTOM_FIELD
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor() {
    super()
    this.db = getConnection(C.SERVICE_NAME.CUSTOMER_CUSTOM_FIELD).getRepository(
      CustomerCustomField,
    )
  }
}
