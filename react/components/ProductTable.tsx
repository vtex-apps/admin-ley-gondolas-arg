/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Button, Modal, Tag } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import { titlesIntl } from '../utils/intl'
import getCategoryTree from '../graphql/getCategoryTree.gql'
import LoadingSpinner from './LoadingSpinner'

export default function ProductTable({
  idRow,
  nameProduct,
  idProduct,
  items,
  setItems,
  closeModal,
}: ProductTableProps) {
  const intl = useIntl()
  const [selectedProduct, setSelectedCategory] = useState('')
  const [selectedIdProduct, setSelectedIdCategory] = useState('')
  const [categoryTree, setCategoryTree] = useState('')

  console.info('idProduct', idProduct)
  const responseFromGetCategoryTree = useQuery(getCategoryTree, {
    ssr: false,
  })

  const dataFromGetCategoryTree: CategoryChildenListProps[] =
    responseFromGetCategoryTree.data?.getCategoryTree?.data

  const idCategoryOfRow = items[idRow].categorieCatalog.id

  console.info('id de la categoria de la fila', idCategoryOfRow)
  console.info('dataFromGetCategoryTree', dataFromGetCategoryTree)

  dataFromGetCategoryTree?.forEach(
    (c: CategoryChildenListProps) => !categoryTree && findCategoryTree(c)
  )

  console.info('------categoryTree-------', categoryTree)

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
        {dataFromGetCategoryTree && `test`}
        {!dataFromGetCategoryTree && <LoadingSpinner />}
      </div>
    </Modal>
  )
}
