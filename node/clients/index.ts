import { IOClients } from '@vtex/api'

import MasterDataClient from './masterDataClient'
import CatalogClient from './catalogClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get masterDataClient() {
    return this.getOrSet('masterDataClient', MasterDataClient)
  }

  public get catalogClient() {
    return this.getOrSet('catalogClient', CatalogClient)
  }
}
