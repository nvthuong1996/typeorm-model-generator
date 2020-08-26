import { Container, ContainerModule } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import { getDbConnection } from '@Utils/db'

import {
  ProductExportItemRepository,
  ProductExportsRepository,
  ProductImportItemRepository,
  ProductImportsRepository,
  ProductTransfersRepository,
  ProductTransfersItemRepository,
  StockAdjustmentsRepository,
  TransactionsRepository,
} from './repository'

import {
  ProductExportItem,
  ProductExports,
  ProductImportItem,
  ProductImports,
  ProductTransfers,
  ProductTransfersItem,
  StockAdjustments,
  Transactions,
} from './models'

const container = new Container()
export const { lazyInject } = getDecorators(container)
const bindings = new ContainerModule(async (bind) => {
  const schemaName = 'importexport'
  const connectionName = 'importexport'
  await getDbConnection({
    schema: schemaName,
    connectionName,
    entities: [
      ProductExportItem,
      ProductExports,
      ProductImportItem,
      ProductImports,
      ProductTransfers,
      ProductTransfersItem,
      StockAdjustments,
      Transactions,
    ],
  })
  bind<ProductExportItemRepository>(ProductExportItemRepository).toConstantValue(
    new ProductExportItemRepository(connectionName),
  )
  bind<ProductExportsRepository>(ProductExportsRepository).toConstantValue(
    new ProductExportsRepository(connectionName),
  )
  bind<ProductImportItemRepository>(ProductImportItemRepository).toConstantValue(
    new ProductImportItemRepository(connectionName),
  )
  bind<ProductImportsRepository>(ProductImportsRepository).toConstantValue(
    new ProductImportsRepository(connectionName),
  )
  bind<ProductTransfersRepository>(ProductTransfersRepository).toConstantValue(
    new ProductTransfersRepository(connectionName),
  )
  bind<ProductTransfersItemRepository>(ProductTransfersItemRepository).toConstantValue(
    new ProductTransfersItemRepository(connectionName),
  )
  bind<StockAdjustmentsRepository>(StockAdjustmentsRepository).toConstantValue(
    new StockAdjustmentsRepository(connectionName),
  )
  bind<TransactionsRepository>(TransactionsRepository).toConstantValue(
    new TransactionsRepository(connectionName),
  )
})

container.load(bindings)
