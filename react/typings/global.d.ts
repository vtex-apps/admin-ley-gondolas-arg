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

  export interface Product {
    idRow: number
    id: string
    name: string
  }

  export interface CategoriesRow {
    id: number
    idDocument: string
    categorieLaw: string
    categorieCatalog: CategorieCatalog
    bestLowerProduct: Product
  }

  export interface CategoriesTableProps {
    categoriesList: CategoriesRow[]
  }

  export interface DocumentCategorie {
    id: string
    categorieLaw: string
    categorieCatalog: string
    idCategory: number
    nameBestLowerProduct: string
    idBestLowerProduct: string
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

  export interface ProductSearchProps {
    idRow: number
    nameProduct: string
    idProduct: string
    items: CategoriesRow[]
    setItems: (items: CategoriesRow[]) => void
    closeModal: ({ id, idRow, name }: Product) => void
  }
  export interface Image {
    imageId: string
    imageUrl: string
    imageText: string
  }

  export interface Item {
    itemId: string
    name: string
    images: Image[]
  }

  export interface ProductFromQuery {
    productId: string
    productName: string
    brand: string
    categoryId: string
    pricePerUnit: number[]
    leyDeGondolas: string[]
    linkText: string
    items: Item[]
  }
  export interface Catalog {
    idRow: number
    productId: string
    name: string
  }
  export interface ProductToTable {
    id: number
    catalog: Catalog
    productId: string
    productName: {
      name: string
      link: string
    }
    brand: string
    categoryId: string
    pricePerUnit: number
    bestLowerPrice: string[]
    pymes: string[]
    linkText: string
    items: Item[]
  }

  export interface ProductTableProps {
    listOfProducts: ProductToTable[]
    setListOfProducts: (listOfProducts: ProductToTable[]) => void
    items: CategoriesRow[]
    setItems: (items: CategoriesRow[]) => void
  }

  export interface BodySaveDocumentMasterData {
    categorieLaw: string
    categorieCatalog: string
    idCategory: number
    nameBestLowerProduct: string
    idBestLowerProduct: string
  }

  interface PaginationContext {
    totalItems: number,
    from: number
    to: number
    currentPage: number
    totalPages: number
    limit: number
  }
}
