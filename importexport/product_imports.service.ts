'use strict'
import { getSchema } from '@Common/decorator/fast-validate-decorator'
import { Context } from 'moleculer'
import { Method, Service } from 'moleculer-decorators'

import { MoleculerService } from '@Common/class'
import { ActionMixins } from '@Mixins'
import { C } from '@Constant'
import { ProductImports } from './models'
import { ProductImportsRepository } from './repository'
import { lazyInject } from './di_container'

@Service({
  name: C.SERVICE_NAME.PRODUCT_IMPORTS,
  settings: {},
  mixins: [ActionMixins(ProductImports)],
  hooks: {
    before: {},
  },
})
class ProductImportsServiceBroken extends MoleculerService {
  @lazyInject(ProductImportsRepository)
  protected repository: ProductImportsRepository
}
export default ProductImportsServiceBroken
