/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Button, Modal, Tag } from 'vtex.styleguide'
import { useQuery, useMutation } from 'react-apollo'
import { useIntl } from 'react-intl'

import { titlesIntl } from '../utils/intl'
import getCategoryTree from '../graphql/getCategoryTree.gql'
import RecurviseChildenList from './RecurviseChildenList'
import LoadingSpinner from './LoadingSpinner'
import SaveInMasterdata from './SaveInMasterdata'
import updateDocument from '../graphql/updateDocument.gql'
import createDocument from '../graphql/createDocument.gql'

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
  const [updateDocumentMutation] = useMutation(updateDocument)

  const [createDocumentMutation, { data: dataCreateDocumentMutation }] =
    useMutation(createDocument)

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

    SaveInMasterdata(
      tempItems,
      idRow,
      updateDocumentMutation,
      createDocumentMutation
    )

    closeModal({ id: -1, idRow: -1, name: '' })
  }

  useEffect(() => {
    if (dataCreateDocumentMutation) {
      console.info('dataCreateDocumentMutation', dataCreateDocumentMutation)
    }
  }, [dataCreateDocumentMutation])

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
