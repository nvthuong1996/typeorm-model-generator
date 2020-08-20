'use strict'
import { getSchema } from 'fastest-validator-decorators'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { CustomerChannel } from './models'
import { CustomerChannelRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.CUSTOMER_CHANNEL,
  settings: {
    entityValidator: getSchema(CustomerChannel),
  },
  mixins: [ActionMixins()],
  hooks: {
    before: {},
  },
})
class CustomerChannelServiceBroken extends MoleculerService {
  @lazyInject(CustomerChannelRepository)
  protected repository: CustomerChannelRepository
}
export default CustomerChannelServiceBroken
