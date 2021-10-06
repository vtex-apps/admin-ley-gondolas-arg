/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'

import getCategoryTree from '../graphql/getCategoryTree.gql'
import RecurviseChildenList from './RecurviseChildenList'

export default function CategoriesTree({
  idRow,
  nameCategory,
  items,
  setItems,
  closeModal,
}: CategoriesTreeProps) {
  const responseFromGetCategoryTree = useQuery(getCategoryTree, {
    ssr: false,
  })

  const statusFromGetCategoryTree =
    responseFromGetCategoryTree.data?.getCategoryTree?.status

  const dataFromGetCategoryTree: CategoryChildenListProps[] =
    responseFromGetCategoryTree.data?.getCategoryTree?.data

  console.info('statusFromGetCategoryTree', statusFromGetCategoryTree)
  console.info('dataFromGetCategoryTree', dataFromGetCategoryTree)

  const handleChangeCategory = () => {
    const tempItems: CategoriesRow[] = items

    tempItems[idRow].categorieCatalog.name = 'Test'
    setItems(tempItems)
    closeModal({ idRow: -1, name: '' })
  }

  /*
  const createNodes = (childen: any) => {
    childen.map((data: any) => (
      <li key={data.id}>
        <p>{data.name}</p>
      </li>
    ))
  }
*/

  return (
    <div>
      <div>{nameCategory && `Categoria Actual: ${nameCategory}`}</div>
      <div>
        <Button
          variation="secondary"
          size="small"
          onClick={() => handleChangeCategory()}
        >
          {`Guardar Categoria Catalogo`}
        </Button>
      </div>
      {dataFromGetCategoryTree && (
        <RecurviseChildenList category={dataFromGetCategoryTree} />
      )}
    </div>
  )
}
