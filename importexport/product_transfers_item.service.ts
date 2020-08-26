'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { ProductTransfersItem } from './models'
import { ProductTransfersItemRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.PRODUCT_TRANSFERS_ITEM,
  settings: {},
  mixins: [ActionMixins(ProductTransfersItem)],
  hooks: {
    before: {},
  },
})
class ProductTransfersItemServiceBroken extends MoleculerService {
  @lazyInject(ProductTransfersItemRepository)
  protected repository: ProductTransfersItemRepository
}
export default ProductTransfersItemServiceBroken
