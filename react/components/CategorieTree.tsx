/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Button, Modal, Tag } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import { titlesIntl } from '../utils/intl'
import getCategoryTree from '../graphql/getCategoryTree.gql'
import RecurviseChildenList from './RecurviseChildenList'
import LoadingSpinner from './LoadingSpinner'

export default function CategoriesTree({
  idRow,
  nameCategory,
  items,
  setItems,
  closeModal,
}: CategoriesTreeProps) {
  const intl = useIntl()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedIdCategory, setSelectedIdCategory] = useState(-1)

  const responseFromGetCategoryTree = useQuery(getCategoryTree, {
    ssr: false,
  })

  const dataFromGetCategoryTree: CategoryChildenListProps[] =
    responseFromGetCategoryTree.data?.getCategoryTree?.data

  const handleChangeCategory = () => {
    const tempItems: CategoriesRow[] = items

    tempItems[idRow].categorieCatalog.name = selectedCategory
    tempItems[idRow].categorieCatalog.id = selectedIdCategory
    setItems(tempItems)
    closeModal({ id: -1, idRow: -1, name: '' })
  }

  return (
    <Modal
      centered
      isOpen
      onClose={() => closeModal({ id: -1, idRow: -1, name: '' })}
      bottomBar={
        <div className="nowrap">
          {nameCategory && (
            <span className="mr4">
              <Tag bgColor="#F71963">{`${intl.formatMessage(
                titlesIntl.currentCategory
              )}: ${nameCategory}`}</Tag>
            </span>
          )}
          <span className="mr4">
            <Button
              variation="tertiary"
              onClick={() => closeModal({ id: -1, idRow: -1, name: '' })}
            >
              {`${intl.formatMessage(titlesIntl.cancel)}`}
            </Button>
          </span>
          <span>
            <Button
              variation="primary"
              size="small"
              onClick={() => handleChangeCategory()}
            >
              {`${intl.formatMessage(titlesIntl.saveSelectedCategory)}`}
            </Button>
          </span>
        </div>
      }
    >
      <div>
        <div />
        {dataFromGetCategoryTree && (
          <RecurviseChildenList
            category={dataFromGetCategoryTree}
            selectedCategory={nameCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedIdCategory={setSelectedIdCategory}
          />
        )}
        {!dataFromGetCategoryTree && <LoadingSpinner />}
      </div>
    </Modal>
  )
}
