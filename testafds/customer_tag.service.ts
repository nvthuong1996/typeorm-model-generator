'use strict'
import { getSchema } from 'fastest-validator-decorators'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { CustomerTag } from './models'
import { CustomerTagRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.CUSTOMER_TAG,
  settings: {
    entityValidator: getSchema(CustomerTag),
  },
  mixins: [],
  hooks: {
    before: {},
  },
})
class CustomerTagServiceBroken extends MoleculerService {
  @lazyInject(CustomerTagRepository)
  protected repository: CustomerTagRepository
}
export default CustomerTagServiceBroken
