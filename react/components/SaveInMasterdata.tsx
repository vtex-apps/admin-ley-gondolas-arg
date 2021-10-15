/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useIntl } from 'react-intl'

// import { titlesIntl } from '../utils/intl'
/* import { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'

import updateDocument from '../graphql/updateDocument.gql'
import createDocument from '../graphql/createDocument.gql' */

// eslint-disable-next-line max-params
export default function SaveInMasterdata(
  items: CategoriesRow[],
  rowId: number,
  updateDocumentMutation: any,
  createDocumentMutation: any
) {
  const { idDocument, categorieLaw, categorieCatalog, bestLowerProduct } =
    items[rowId]

  const { id: idCategory, name: nameCategorieCatalog } = categorieCatalog

  const { id: idBestLowerProduct, name: nameBestLowerProduct } =
    bestLowerProduct

  const bodyMasterdata: BodySaveDocumentMasterData = {
    categorieLaw,
    categorieCatalog: nameCategorieCatalog,
    idCategory,
    nameBestLowerProduct,
    idBestLowerProduct,
  }

  try {
    if (idDocument) {
      updateDocumentMutation({
        variables: { documentId: idDocument, body: bodyMasterdata },
      })
    } else {
      createDocumentMutation({
        variables: { body: bodyMasterdata },
      })
    }
  } catch (error) {
    console.error(error)
  }
}
