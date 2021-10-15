/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useIntl } from 'react-intl'

// import { titlesIntl } from '../utils/intl'
/* import { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'

import updateDocument from '../graphql/updateDocument.gql'
import createDocument from '../graphql/createDocument.gql' */

// eslint-disable-next-line max-params
export default async function SaveInMasterdata(
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

  let response

  try {
    if (idDocument) {
      response = await updateDocumentMutation({
        variables: { documentId: idDocument, body: bodyMasterdata },
      })
    } else {
      response = await createDocumentMutation({
        variables: { body: bodyMasterdata },
      })
    }

    return response
  } catch (error) {
    console.error(error)
  }
}
