'use strict'
import { getSchema } from 'fastest-validator-decorators'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { CustomerCustomFieldvalue } from './models'
import { CustomerCustomFieldvalueRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.CUSTOMER_CUSTOM_FIELDVALUE,
  settings: {
    entityValidator: getSchema(CustomerCustomFieldvalue),
  },
  mixins: [],
  hooks: {
    before: {},
  },
})
class CustomerCustomFieldvalueServiceBroken extends MoleculerService {
  @lazyInject(CustomerCustomFieldvalueRepository)
  protected repository: CustomerCustomFieldvalueRepository
}
export default CustomerCustomFieldvalueServiceBroken
