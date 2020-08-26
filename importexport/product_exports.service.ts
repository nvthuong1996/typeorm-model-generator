'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { ProductExports } from './models'
import { ProductExportsRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.PRODUCT_EXPORTS,
  settings: {},
  mixins: [ActionMixins(ProductExports)],
  hooks: {
    before: {},
  },
})
class ProductExportsServiceBroken extends MoleculerService {
  @lazyInject(ProductExportsRepository)
  protected repository: ProductExportsRepository
}
export default ProductExportsServiceBroken
