import { getConnection } from 'typeorm'
import { injectable } from 'inversify'

import { TypeOrmBaseRepository } from '@Common/class'
import { C } from '@Constant'
import { ErrorCodes } from '@Errors'
import { CustomerChannel } from '../models'
import { QueryCustomerChannel } from '../interface'

@injectable()
export class CustomerChannelRepository extends TypeOrmBaseRepository<
  CustomerChannel,
  QueryCustomerChannel,
  CustomerChannel
> {
  // protected eagerRelations = ['parent']
  protected aliasName = C.SERVICE_NAME.CUSTOMER_CHANNEL
  protected errorNotFound = ErrorCodes.CommonError.NOT_FOUND

  constructor() {
    super()
    this.db = getConnection(C.SERVICE_NAME.CUSTOMER_CHANNEL).getRepository(CustomerChannel)
  }
}
