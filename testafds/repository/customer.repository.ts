import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { Customer } from '../models'
import { QueryCustomer } from '../interface'

@injectable()
export class CustomerRepository extends TypeOrmBaseRepository<
  Customer,
  QueryCustomer,
  Customer
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.CUSTOMER
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor() {
    super()
    this.db = getConnection(C.SERVICE_NAME.CUSTOMER).getRepository(Customer)
  }
}
