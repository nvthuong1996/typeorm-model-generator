'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { ProductTransfers } from './models'
import { ProductTransfersRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.PRODUCT_TRANSFERS,
  settings: {},
  mixins: [ActionMixins(ProductTransfers)],
  hooks: {
    before: {},
  },
})
class ProductTransfersServiceBroken extends MoleculerService {
  @lazyInject(ProductTransfersRepository)
  protected repository: ProductTransfersRepository
}
export default ProductTransfersServiceBroken
