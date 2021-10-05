import React from 'react'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { titlesIntl } from './utils/intl'
import './styles.global.css'
import CategoriesTable from './components/CategoriesTable'

export default function LeyGondolas() {
  const intl = useIntl()
  const categoriesList: CategoriesRow[] = [
    {
      categorie: 'Leches',
      categorieCatalog: '',
      bestLowerProduct: '',
    },
    {
      categorie: 'Cremas de leche, mantecas y margarinas',
      categorieCatalog: '',
      bestLowerProduct: '',
    },
    {
      categorie: 'Quesos untables y ricotas',
      categorieCatalog: '',
      bestLowerProduct: '',
    },
    {
      categorie: 'Postres lácteos y yogures',
      categorieCatalog: '',
      bestLowerProduct: '',
    },
    {
      categorie: 'Masas frescas y levaduras',
      categorieCatalog: '',
      bestLowerProduct: '',
    },
  ]

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader title={intl.formatMessage(titlesIntl.pageTitle)} />
      }
    >
      <PageBlock variation="full">
        <CategoriesTable categoriesList={categoriesList} />
      </PageBlock>
    </Layout>
  )
}
