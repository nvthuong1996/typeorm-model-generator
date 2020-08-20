import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { CustomerAddress } from '../models'
import { QueryCustomerAddress } from '../interface'

@injectable()
export class CustomerAddressRepository extends TypeOrmBaseRepository<
  CustomerAddress,
  QueryCustomerAddress,
  CustomerAddress
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.CUSTOMER_ADDRESS
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor() {
    super()
    this.db = getConnection(C.SERVICE_NAME.CUSTOMER_ADDRESS).getRepository(CustomerAddress)
  }
}
