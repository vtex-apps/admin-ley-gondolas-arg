/* eslint-disable prettier/prettier */

import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { ResponseCreateSchema, BodySchema } from '../interfaces'

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
    return this.http.postRaw(
      `/leyGondolas/documents?_schema=ley-gondolas`,
      body
    )
  }

  public async updateDocument(id: string, body: SaveDataInMasterDataBody) {
    await this.http.patch(
      `/leyGondolas/documents/${id}?_schema=ley-gondolas`,
      body
    )

    return { status: 200 }
  }

  public async createSchema(
    body: BodySchema
  ): Promise<IOResponse<ResponseCreateSchema>> {
    return this.http.putRaw(`/leyGondolas/schemas/ley-gondolas`, body)
  }
}
