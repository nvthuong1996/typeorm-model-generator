'use strict'
import { getSchema } from 'fastest-validator-decorators'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { Customer } from './models'
import { CustomerRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.CUSTOMER,
  settings: {
    entityValidator: getSchema(Customer),
  },
  mixins: [ActionMixins()],
  hooks: {
    before: {},
  },
})
class CustomerServiceBroken extends MoleculerService {
  @lazyInject(CustomerRepository)
  protected repository: CustomerRepository
}
export default CustomerServiceBroken
