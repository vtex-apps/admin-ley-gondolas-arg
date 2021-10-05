/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode, SetStateAction, Dispatch } from 'react'

declare global {
  export interface CategoriesRow {
    id: number
    idDocument: string
    categorieLaw: string
    categorieCatalog: string
    bestLowerProduct: string
  }

  export interface CategoriesTableProps {
    categoriesList: CategoriesRow[]
  }

  export interface DocumentCategorie {
    id: string
    categorieLaw: string
    categorieCatalog: string
    bestLowerProduct: string
  }
}
