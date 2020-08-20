'use strict'
import { getSchema } from 'fastest-validator-decorators'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { CustomerNote } from './models'
import { CustomerNoteRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.CUSTOMER_NOTE,
  settings: {
    entityValidator: getSchema(CustomerNote),
  },
  mixins: [],
  hooks: {
    before: {},
  },
})
class CustomerNoteServiceBroken extends MoleculerService {
  @lazyInject(CustomerNoteRepository)
  protected repository: CustomerNoteRepository
}
export default CustomerNoteServiceBroken
