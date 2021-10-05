import React from 'react'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { titlesIntl } from './utils/intl'
import './styles.global.css'
import CategoriesTable from './components/CategoriesTable'

export default function LeyGondolas() {
  const intl = useIntl()

  const listOfLawCategories: string[] = [
    'Leches',
    'Cremas de leche, mantecas y margarinas',
    'Quesos untables y ricotas',
    'Postres lácteos y yogures',
    'Masas frescas y levaduras',
    'Fiambres, embutidos y encurtidos',
    'Quesos excepto untables y ricotas',
    'Hamburguesas, milanesas y bocaditos de carne, pollo, cerdo y/o pescado congelados',
    'Vegetales congelados, milanesas y medallones sin carne congelados',
    'Comidas preparadas y panificados congelados',
    'Helados y postres congelados',
    'Frutas y verduras',
    'Salsas y aderezos',
    'Especias y condimentos',
    'Polvo para postres y repostería, y productos de repostería',
    'Conservas y salsas de tomate',
    'Otras conservas',
    'Pastas secas',
    'Arroz',
    'Sopas, caldos y puré',
    'Legumbres secas, otras harinas, granos y semillas',
    'Aceites',
    'Panes rallados y rebozadores',
    'Harinas de trigo y premezclas',
    'Golosinas, alfajores y chocolates',
    'Panificados y cereales',
    'Galletitas',
    'Infusiones',
    'Mermeladas, dulces y miel',
    'Dulce de leche',
    'Endulzantes',
    'Snacks',
    'Jugos',
    'Aguas saborizadas',
    'Gaseosas',
    'Aguas',
    'Bebidas sin alcohol refrigeradas',
    'Cervezas y aperitivos',
    'Vinos y espumantes',
    'Espirituosas, destilados y licores',
    'Bebidas con alcohol refrigeradas',
    'Afeitado y depilación',
    'Colonias y desodorantes corporales, polvos pédicos y talcos',
    'Jabones de tocador, geles y sales de baño, artículos de baño',
    'Cremas decolorantes y coloración para el cabello',
    'Champúes, Acondicionadores, fijadores y productos para el tratamiento capilar',
    'Cuidado facial y artículos de farmacia',
    'Cremas corporales',
    'Protectores solares y bronceadores',
    'Cuidado oral',
    'Productos para la higiene del bebé, accesorios para el bebé y alimentación infantil',
    'Pañales y ropa interior descartable',
    'Productos de gestión menstrual, toallas para la incontinencia y cuidado materno',
    'Accesorios de limpieza',
    'Accesorios de cocina',
    'Jabón en pan, prelavado, quitamanchas y perfumes para la ropa',
    'Jabones en polvo, jabones líquidos y suavizantes para la ropa',
    'Desodorantes y desinfectantes ambientales',
    'Lavandinas',
    'Lavavajillas',
    'Limpieza de pisos y muebles',
    'Limpiadores cremosos, de cocina, de baño y multiuso',
    'Insecticidas y repelentes',
    'Papeles',
    'Alimentos y accesorios para mascotas',
  ]

  const categoriesList: CategoriesRow[] = listOfLawCategories.map(
    (lawCategorie: string) => {
      return {
        categorie: lawCategorie,
        categorieCatalog: '',
        bestLowerProduct: '',
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
        <CategoriesTable categoriesList={categoriesList} />
      </PageBlock>
    </Layout>
  )
}
