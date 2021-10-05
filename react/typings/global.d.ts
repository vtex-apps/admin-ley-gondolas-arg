/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode, SetStateAction, Dispatch } from 'react'

declare global {
  export interface CategoriesRow {
    categorie: string
    categorieCatalog: string
    bestLowerProduct: string
  }

  export interface CategoriesTableProps {
    categoriesList: CategoriesRow[]
  }
}
