import React from 'react'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'

import { titlesIntl } from './utils/intl'
import { listOfLawCategories } from './utils/listOfLawCategories'
import './styles.global.css'
import CategoriesTable from './components/CategoriesTable'
import getData from './graphql/getData.gql'
import LoadingSpinner from './components/LoadingSpinner'

export default function LeyGondolas() {
  const intl = useIntl()
  const responseFromGetData = useQuery(getData, {
    ssr: false,
  })

  const statusFromMasterData = responseFromGetData.data?.getData?.status
  const dataFromMasterData = responseFromGetData.data?.getData?.data

  console.info('dataFromMasterData', dataFromMasterData)
  console.info('statusFromMasterData', statusFromMasterData)

  const categoriesList: CategoriesRow[] = listOfLawCategories.map(
    (lawCategorie: string, index: number) => {
      const documentFinded: DocumentCategorie = dataFromMasterData?.find(
        (document: DocumentCategorie) => document.categorieLaw === lawCategorie
      )

      return {
        id: index,
        idDocument: documentFinded?.id || '',
        categorieLaw: lawCategorie,
        categorieCatalog: documentFinded?.categorieCatalog || '',
        bestLowerProduct: documentFinded?.bestLowerProduct || '',
      }
    }
  )

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader title={intl.formatMessage(titlesIntl.pageTitle)} />
      }
    >
      <PageBlock variation="full">
        {categoriesList.length > 0 && dataFromMasterData && (
          <CategoriesTable categoriesList={categoriesList} />
        )}
        {(categoriesList.length === 0 || !dataFromMasterData) && (
          <LoadingSpinner />
        )}
      </PageBlock>
    </Layout>
  )
}
