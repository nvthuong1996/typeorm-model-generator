'use strict'
import { getSchema } from 'fastest-validator-decorators'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { CustomerCustomField } from './models'
import { CustomerCustomFieldRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.CUSTOMER_CUSTOM_FIELD,
  settings: {
    entityValidator: getSchema(CustomerCustomField),
  },
  mixins: [],
  hooks: {
    before: {},
  },
})
class CustomerCustomFieldServiceBroken extends MoleculerService {
  @lazyInject(CustomerCustomFieldRepository)
  protected repository: CustomerCustomFieldRepository
}
export default CustomerCustomFieldServiceBroken
