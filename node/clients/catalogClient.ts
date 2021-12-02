/* eslint-disable prettier/prettier */

import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class CatalogClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/catalog_system`,
      context,
      {
        ...options,
        headers: {
          VtexIdClientAutCookie:
            context.adminUserAuthToken ??
            context.storeUserAuthToken ??
            context.authToken,
        },
      }
    )
  }

  public async getCategoryTree() {
    return this.http.getRaw(`/pub/category/tree/20`)
  }

  public async getProductsOfCategory(categoryTree: string, from: number, to: number, params: string | null = null) {
    return this.http.getRaw(`/pub/products/search?_from=${from}&_to=${to}&fq=C:/${categoryTree}/${params ? `&ft=${params}` : ''}`)
  }
}
