import type { BodySchema } from '../interfaces'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function configSchema(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { masterDataClient },
  } = ctx

  const bodySchema: BodySchema = {
    properties: {
      categorieCatalog: {
        type: 'string',
        maxLength: 1000,
        title: 'categorieCatalog',
      },
      idCategory: {
        type: 'number',
        maxLength: 50,
        title: 'idCategory',
      },
      categorieLaw: {
        type: 'string',
        maxLength: 1000,
        title: 'categorieLaw',
      },
      idBestLowerProduct: {
        type: 'string',
        maxLength: 50,
        title: 'idBestLowerProduct',
      },
      nameBestLowerProduct: {
        type: 'string',
        maxLength: 1000,
        title: 'nameBestLowerProduct',
      },
    },
    required: [
      'categorieLaw',
      'categorieCatalog',
      'idCategory',
      'idBestLowerProduct',
      'nameBestLowerProduct',
    ],
    'v-indexed': [
      'categorieLaw',
      'categorieCatalog',
      'idCategory',
      'idBestLowerProduct',
      'nameBestLowerProduct',
    ],
    'v-security': {
      publicJsonSchema: true,
      allowGetAll: false,
      publicRead: [
        'categorieLaw',
        'categorieCatalog',
        'idCategory',
        'idBestLowerProduct',
        'nameBestLowerProduct',
      ],
      publicWrite: [
        'categorieLaw',
        'categorieCatalog',
        'idCategory',
        'idBestLowerProduct',
        'nameBestLowerProduct',
      ],
      publicFilter: [
        'categorieLaw',
        'categorieCatalog',
        'idCategory',
        'idBestLowerProduct',
        'nameBestLowerProduct',
      ],
    },
  }

  try {
    const response = await masterDataClient.createSchema(bodySchema)

    const { data } = response

    ctx.body = data
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      Message: 'Hubo un error, intente nuevamente despues.',
    }
  }

  await next()
}
