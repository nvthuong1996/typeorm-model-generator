'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { Transactions } from './models'
import { TransactionsRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.TRANSACTIONS,
  settings: {},
  mixins: [ActionMixins(Transactions)],
  hooks: {
    before: {},
  },
})
class TransactionsServiceBroken extends MoleculerService {
  @lazyInject(TransactionsRepository)
  protected repository: TransactionsRepository
}
export default TransactionsServiceBroken
