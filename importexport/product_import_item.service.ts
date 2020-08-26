'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { ProductImportItem } from './models'
import { ProductImportItemRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.PRODUCT_IMPORT_ITEM,
  settings: {},
  mixins: [ActionMixins(ProductImportItem)],
  hooks: {
    before: {},
  },
})
class ProductImportItemServiceBroken extends MoleculerService {
  @lazyInject(ProductImportItemRepository)
  protected repository: ProductImportItemRepository
}
export default ProductImportItemServiceBroken
