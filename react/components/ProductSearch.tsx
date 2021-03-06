/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react'
import { Modal /* , Tag */ } from 'vtex.styleguide'
import { useQuery, useLazyQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import { titlesIntl } from '../utils/intl'
import getCategoryTree from '../graphql/getCategoryTree.gql'
import getProductsOfCategory from '../graphql/getProductsOfCategory.gql'
import getPaginationData from '../graphql/getPaginationData.gql'
import LoadingSpinner from './LoadingSpinner'
import ProductsTable from './ProductsTable'
import '../style/Modal.global.css'
import { ProductContext } from '../store/context/ProductContext'

export default function ProductSearch({
  idRow,
  // nameProduct,
  items,
  setItems,
  closeModal,
}: ProductSearchProps) {
  const intl = useIntl()
  const [categoryTree, setCategoryTree] = useState('')
  const [listOfProducts, setListOfProducts] = useState<ProductToTable[]>([])
  const { state, dispatch } = useContext(ProductContext)

  const [
    getProductsOfCategoryQuery,
    { data: dataProducts, loading: loadingProducts, error: errorProducts },
  ] = useLazyQuery(getProductsOfCategory)

  const [
    getPaginationDataQuery,
    { data: dataPagination },
  ] = useLazyQuery(getPaginationData)

  useEffect(() => {
    if (categoryTree) {
      getProductsOfCategoryQuery({ variables: { categoryTree, from: state.from, to: state.to, params: state.params } })
      getPaginationDataQuery({
        variables: {
          filters: { categoryId: categoryTree },
          page: state.currentPage,
          pageSize: state.limit,
          term: state.params,
        }
      })
    }

  }, [state.to, state.from, state.limit, state.params, categoryTree, getProductsOfCategoryQuery])

  const responseFromGetCategoryTree = useQuery(getCategoryTree, {
    ssr: false,
  })

  const idCategoryOfRow = items[idRow].categorieCatalog.id

  const dataFromGetCategoryTree: CategoryChildenListProps[] =
    responseFromGetCategoryTree.data?.getCategoryTree?.data

  dataFromGetCategoryTree?.forEach(
    (c: CategoryChildenListProps) => !categoryTree && findCategoryTree(c)
  )

  function findCategoryTree(
    categoryToCheck: CategoryChildenListProps,
    parents = ''
  ): any {
    if (categoryToCheck.children.some((c) => c.id === idCategoryOfRow)) {
      setCategoryTree(
        `${!parents ? categoryToCheck.id : parents}/${idCategoryOfRow}`
      )
    } else if (categoryToCheck.id === idCategoryOfRow) {
      setCategoryTree(`${!parents ? categoryToCheck.id : parents}`)
    } else {
      return categoryToCheck.children.some(
        (c) =>
          c.id === idCategoryOfRow ||
          findCategoryTree(
            c,
            `${!parents ? categoryToCheck.id : parents}/${c.id}`
          )
      )
    }
  }

  /*   useEffect(() => {
      if (categoryTree) {
        getProductsOfCategoryQuery({ variables: { categoryTree } })
      }
    }, [categoryTree, getProductsOfCategoryQuery]) */

  useEffect(() => {
    if (dataPagination) {
      dispatch({ type: "SET_TOTAL_ITEMS", payload: dataPagination.products.paging.total })
      dispatch({ type: "SET_TOTAL_PAGES", payload: dataPagination.products.paging.pages })
      dispatch({ type: "SET_CURRENT_PAGE", payload: dataPagination.products.paging.page })
    }
  }, [dataPagination])

  useEffect(() => {
    if (errorProducts) {
      console.info('errorProducts', errorProducts)
    }

    // eslint-disable-next-line vtex/prefer-early-return
    if (dataProducts) {
      const listOfProductsTemp: ProductToTable[] =
        dataProducts.getProductsOfCategory.data.map(
          (p: ProductFromQuery, index: number) => {
            return {
              id: index,
              catalog: {
                idRow,
                productId: p.productId,
                name: p.productName,
              },
              image: {
                imageId: p.items[0].images[0].imageId,
                imageUrl: p.items[0].images[0].imageUrl,
                imageText: p.items[0].images[0].imageText,
              },
              productId: p.productId,
              productName: {
                name: p.productName,
                link: p.linkText,
              },
              brand: p.brand,
              categoryId: p.categoryId,
              pricePerUnit: p.pricePerUnit && p.pricePerUnit[0],
              bestLowerPrice: p.leyDeGondolas,
              pymes: p.leyDeGondolas,
            }
          }
        )

      listOfProductsTemp.sort(
        (a, b) =>
          (a.pricePerUnit != null ? a.pricePerUnit : Infinity) -
          (b.pricePerUnit != null ? b.pricePerUnit : Infinity)
      )

      setListOfProducts(listOfProductsTemp)
    }
  }, [dataProducts, loadingProducts, errorProducts, idRow])
  return (
    <Modal
      centered
      isOpen
      onClose={() => closeModal({ id: '', idRow: -1, name: '' })}
    >
      <div>
        {idCategoryOfRow !== -1 &&
          dataProducts && (
            <ProductsTable
              listOfProducts={listOfProducts}
              setListOfProducts={setListOfProducts}
              items={items}
              setItems={setItems}
            />
          )}
        {loadingProducts && <LoadingSpinner />}
        {errorProducts && (
          <div className="w-100">
            <p className="f3 fw3 gray">
              {intl.formatMessage(titlesIntl.tryLater)}
            </p>
          </div>
        )}
        {idCategoryOfRow === -1 && (
          <div className="w-100">
            <p className="f3 fw3 gray">
              {intl.formatMessage(titlesIntl.warningSelectCategory)}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
