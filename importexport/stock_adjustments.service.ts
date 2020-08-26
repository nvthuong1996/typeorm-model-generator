'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { StockAdjustments } from './models'
import { StockAdjustmentsRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.STOCK_ADJUSTMENTS,
  settings: {},
  mixins: [ActionMixins(StockAdjustments)],
  hooks: {
    before: {},
  },
})
class StockAdjustmentsServiceBroken extends MoleculerService {
  @lazyInject(StockAdjustmentsRepository)
  protected repository: StockAdjustmentsRepository
}
export default StockAdjustmentsServiceBroken
