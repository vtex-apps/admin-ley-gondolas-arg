/* eslint-disable prettier/prettier */

import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class MasterDataClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/dataentities`,
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

  public async getData() {
    return this.http.getRaw(`/leyGondolas/search?_fields=_all`)
  }

  public async createDocument(body: SaveDataInMasterDataBody) {
    const aux = await this.http.postRaw(
      `/leyGondolas/documents?_schema=ley-gondolas`,
      body
    )

    console.info('aux', aux)

    return aux
  }

  public async updateDocument(id: string, body: SaveDataInMasterDataBody) {
    await this.http.patch(
      `/leyGondolas/documents/${id}?_schema=ley-gondolas`,
      body
    )

    return { status: 200 }
  }
}
