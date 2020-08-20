import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import {
  CustomerRepository,
  CustomerAddressRepository,
  CustomerChannelRepository,
  CustomerCustomFieldRepository,
  CustomerCustomFieldvalueRepository,
  CustomerNoteRepository,
  CustomerTagRepository,
} from './repository'

const container = new Container()
export const { lazyInject } = getDecorators(container)
container.bind<CustomerRepository>(CustomerRepository).toSelf()
container.bind<CustomerAddressRepository>(CustomerAddressRepository).toSelf()
container.bind<CustomerChannelRepository>(CustomerChannelRepository).toSelf()
container.bind<CustomerCustomFieldRepository>(CustomerCustomFieldRepository).toSelf()
container.bind<CustomerCustomFieldvalueRepository>(CustomerCustomFieldvalueRepository).toSelf()
container.bind<CustomerNoteRepository>(CustomerNoteRepository).toSelf()
container.bind<CustomerTagRepository>(CustomerTagRepository).toSelf()
