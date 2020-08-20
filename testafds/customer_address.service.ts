'use strict'
import { getSchema } from 'fastest-validator-decorators'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { CustomerAddress } from './models'
import { CustomerAddressRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.CUSTOMER_ADDRESS,
  settings: {
    entityValidator: getSchema(CustomerAddress),
  },
  mixins: [ActionMixins()],
  hooks: {
    before: {},
  },
})
class CustomerAddressServiceBroken extends MoleculerService {
  @lazyInject(CustomerAddressRepository)
  protected repository: CustomerAddressRepository
}
export default CustomerAddressServiceBroken
