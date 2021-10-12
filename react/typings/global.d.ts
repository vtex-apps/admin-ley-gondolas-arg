/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NumberElement } from '@formatjs/icu-messageformat-parser'
import { string } from 'prop-types'
import type { ReactNode, SetStateAction, Dispatch } from 'react'

declare global {
  export interface CategorieCatalog {
    idRow: number
    id: number
    name: string
  }
  export interface CategoriesRow {
    id: number
    idDocument: string
    categorieLaw: string
    categorieCatalog: CategorieCatalog
    bestLowerProduct: string
  }

  export interface CategoriesTableProps {
    categoriesList: CategoriesRow[]
  }

  export interface DocumentCategorie {
    id: string
    categorieLaw: string
    categorieCatalog: string
    idCategory: number
    bestLowerProduct: string
  }

  export interface CategoriesTreeProps {
    idRow: number
    nameCategory: string
    items: CategoriesRow[]
    setItems: (items: CategoriesRow[]) => void
    closeModal: ({ id, idRow, name }: CategorieCatalog) => void
  }

  export interface CategoryChildenListProps {
    id: number
    name: string
    hasChildren: boolean
    children: CategoryChildenListProps[]
  }

  export interface RecursiveChildenListProps {
    category: CategoryChildenListProps[]
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    setSelectedIdCategory: (id: number) => void
  }
}
