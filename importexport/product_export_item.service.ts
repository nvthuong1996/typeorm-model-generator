'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { ProductExportItem } from './models'
import { ProductExportItemRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.PRODUCT_EXPORT_ITEM,
  settings: {},
  mixins: [ActionMixins(ProductExportItem)],
  hooks: {
    before: {},
  },
})
class ProductExportItemServiceBroken extends MoleculerService {
  @lazyInject(ProductExportItemRepository)
  protected repository: ProductExportItemRepository
}
export default ProductExportItemServiceBroken
