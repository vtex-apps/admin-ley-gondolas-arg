/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Button, Modal, Tag } from 'vtex.styleguide'
import { useQuery, useLazyQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import { titlesIntl } from '../utils/intl'
import getCategoryTree from '../graphql/getCategoryTree.gql'
import getProductsOfCategory from '../graphql/getProductsOfCategory.gql'
import LoadingSpinner from './LoadingSpinner'
import ProductsTable from './ProductsTable'

export default function ProductSearch({
  idRow,
  nameProduct,
  idProduct,
  items,
  setItems,
  closeModal,
}: ProductSearchProps) {
  const intl = useIntl()
  const [selectedProduct, setSelectedCategory] = useState('')
  const [selectedIdProduct, setSelectedIdCategory] = useState('')
  const [categoryTree, setCategoryTree] = useState('')
  const [listOfProducts, setListOfProducts] = useState<ProductToTable[]>([])

  const [
    getProductsOfCategoryQuery,
    { data: dataProducts, loading: loadingProducts, error: errorProducts },
  ] = useLazyQuery(getProductsOfCategory)

  console.info('idProduct', idProduct)
  const responseFromGetCategoryTree = useQuery(getCategoryTree, {
    ssr: false,
  })

  const dataFromGetCategoryTree: CategoryChildenListProps[] =
    responseFromGetCategoryTree.data?.getCategoryTree?.data

  const idCategoryOfRow = items[idRow].categorieCatalog.id

  dataFromGetCategoryTree?.forEach(
    (c: CategoryChildenListProps) => !categoryTree && findCategoryTree(c)
  )

  function findCategoryTree(
    categoryToCheck: CategoryChildenListProps,
    parents = ''
  ): any {
    if (categoryToCheck.children.some((c) => c.id === idCategoryOfRow)) {
      console.info(true)
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

  const handleChangeProduct = () => {
    const tempItems: CategoriesRow[] = items

    console.info('selectedProduct', selectedProduct)
    console.info('selectedIdProduct', selectedIdProduct)
    setSelectedCategory('Test')
    setSelectedIdCategory('123')
    tempItems[idRow].bestLowerProduct.name = 'Test' // selectedProduct
    tempItems[idRow].bestLowerProduct.id = '123' // selectedIdProduct
    setItems(tempItems)
    closeModal({ id: '', idRow: -1, name: '' })
  }

  useEffect(() => {
    if (categoryTree) {
      console.info('------categoryTree-------', categoryTree)

      getProductsOfCategoryQuery({ variables: { categoryTree } })
    }
  }, [categoryTree, getProductsOfCategoryQuery])

  useEffect(() => {
    if (loadingProducts) {
      console.info('loadingProducts', loadingProducts)
    }

    if (errorProducts) {
      console.info('errorProducts', errorProducts)
    }

    // eslint-disable-next-line vtex/prefer-early-return
    if (dataProducts) {
      console.info('dataProducts', dataProducts)
      const listOfProductsTemp: ProductToTable[] =
        dataProducts.getProductsOfCategory.data.map(
          (p: ProductFromQuery, index: number) => {
            return {
              id: index,
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
              leyDeGondolas: p.leyDeGondolas,
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
  }, [dataProducts, loadingProducts, errorProducts])

  return (
    <Modal
      centered
      isOpen
      onClose={() => closeModal({ id: '', idRow: -1, name: '' })}
      bottomBar={
        <div className="nowrap">
          {nameProduct && (
            <span className="mr4">
              <Tag bgColor="#F71963">{`${intl.formatMessage(
                titlesIntl.currentCategory
              )}: ${nameProduct}`}</Tag>
            </span>
          )}
          <span className="mr4">
            <Button
              variation="tertiary"
              onClick={() => closeModal({ id: '', idRow: -1, name: '' })}
            >
              {`${intl.formatMessage(titlesIntl.cancel)}`}
            </Button>
          </span>
          <span>
            <Button
              variation="primary"
              size="small"
              onClick={() => handleChangeProduct()}
            >
              {`${intl.formatMessage(titlesIntl.saveSelectedCategory)}`}
            </Button>
          </span>
        </div>
      }
    >
      <div>
        {listOfProducts.length > 0 && (
          <ProductsTable listOfProducts={listOfProducts} />
        )}

        {!dataFromGetCategoryTree && <LoadingSpinner />}
      </div>
    </Modal>
  )
}
