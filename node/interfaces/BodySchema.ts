export interface BodySchema {
  properties: Properties
  required: string[]
  'v-indexed': string[]
  'v-security': VSecurity
}

export interface Properties {
  categorieCatalog: CategorieCatalog
  idCategory: CategorieCatalog
  categorieLaw: CategorieCatalog
  idBestLowerProduct: CategorieCatalog
  nameBestLowerProduct: CategorieCatalog
}

export interface CategorieCatalog {
  type: string
  maxLength: number
  title: string
}

export interface VSecurity {
  publicJsonSchema: boolean
  allowGetAll: boolean
  publicRead: string[]
  publicWrite: string[]
  publicFilter: string[]
}
