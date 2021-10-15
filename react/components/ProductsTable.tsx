/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EXPERIMENTAL_Table as Table,
  Input,
  Link,
  ButtonWithIcon,
} from 'vtex.styleguide'
import Edit from '@vtex/styleguide/lib/icon/Edit'
import useTableMeasures from '@vtex/styleguide/lib/EXPERIMENTAL_Table/hooks/useTableMeasures'
import React, { useState, useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useMutation } from 'react-apollo'

import updateDocument from '../graphql/updateDocument.gql'
import createDocument from '../graphql/createDocument.gql'
import { titlesIntl } from '../utils/intl'
import SaveInMasterdata from './SaveInMasterdata'

export default function ProductsTable({
  listOfProducts,
  items,
  setItems,
}: ProductTableProps) {
  const intl = useIntl()
  const { workspace, account } = useRuntime()
  const [updateDocumentMutation] = useMutation(updateDocument)

  const [createDocumentMutation] = useMutation(createDocument)
  const columns = [
    {
      id: 'catalog',
      title: 'See on Catalog',
      cellRenderer: ({ data }: any) => {
        const edit = <Edit />

        return (
          <ButtonWithIcon
            href={`https://${workspace}--${account}.myvtex.com/admin/Site/ProdutoForm.aspx?id=${data.productId}`}
            target="_blank"
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick={() => handleClickSeeCatalog(data)}
            icon={edit}
          />
        )
      },
    },
    {
      id: 'image',
      title: intl.formatMessage(titlesIntl.productsTableImage),
      cellRenderer: ({ data }: any) => {
        return (
          <img id={data.imageId} src={data.imageUrl} alt={data.imageText} />
        )
      },
    },
    {
      id: 'productId',
      title: intl.formatMessage(titlesIntl.productsTableProductId),
    },
    {
      id: 'productName',
      title: intl.formatMessage(titlesIntl.productsTableProductName),
      cellRenderer: ({ data }: any) => {
        return (
          <Link
            href={`https://${workspace}--${account}.myvtex.com/${data.link}/p`}
            target="_blank"
            mediumWeigth
          >
            {data.name}
          </Link>
        )
      },
    },
    {
      id: 'pricePerUnit',
      title: intl.formatMessage(titlesIntl.productsTablePricePerUnit),
    },
    {
      id: 'brand',
      title: intl.formatMessage(titlesIntl.productsTableBrand),
    },
    {
      id: 'leyDeGondolas',
      title: intl.formatMessage(titlesIntl.productsTableLeyDeGondalas),
    },
  ]

  const handleClickSeeCatalog = async (product: Catalog) => {
    const tempItems: CategoriesRow[] = items

    tempItems[product.idRow].bestLowerProduct.id = product.productId
    tempItems[product.idRow].bestLowerProduct.name = product.name
    setItems(tempItems)
    SaveInMasterdata(
      tempItems,
      product.idRow,
      updateDocumentMutation,
      createDocumentMutation
    )

    const response = await SaveInMasterdata(
      tempItems,
      product.idRow,
      updateDocumentMutation,
      createDocumentMutation
    )

    if (response.data.createDocument) {
      tempItems[product.idRow].idDocument =
        response.data.createDocument.data.DocumentId
    }

    setItems(tempItems)
  }

  const [filteredItems, setFilteredItems] = useState(listOfProducts)
  const [filterStatements, setFilterStatements] = useState([])

  const ITEMS_PER_PAGE = 5

  const { slicedItems, ...paginationProps } = usePagination(
    ITEMS_PER_PAGE,
    filteredItems
  )

  const listOfRowsOptions: number[] = [5]

  if (filteredItems.length >= 5) {
    listOfRowsOptions.push(10)
    if (filteredItems.length >= 10) {
      listOfRowsOptions.push(15)
    }
  }

  const pagination = {
    ...paginationProps,
    textOf: intl.formatMessage(titlesIntl.textOf),
    rowsOptions: listOfRowsOptions,
    textShowRows: intl.formatMessage(titlesIntl.textShowRows),
    totalItems: filteredItems.length,
  }

  const measures = useTableMeasures({
    size:
      pagination.totalItems < pagination.tableSize
        ? pagination.totalItems
        : pagination.tableSize,
    density: 'comfortable',
  })

  function handleFiltersChange(statements = []) {
    let newData = listOfProducts.slice()

    statements.forEach((st: any) => {
      if (!st || !st.object) return
      const { subject, verb, object } = st

      switch (subject) {
        case 'productId':
          if (verb === 'contains') {
            newData = newData.filter((item: any) => {
              return item[subject].includes(object)
            })
          } else if (verb === '=') {
            newData = newData.filter((item: any) => item[subject] === object)
          } else if (verb === '!=') {
            newData = newData.filter((item: any) => item[subject] !== object)
          }

          break

        case 'productName':
          if (verb === 'contains') {
            newData = newData.filter((item: any) => {
              return item[subject].includes(object)
            })
          } else if (verb === '=') {
            newData = newData.filter((item: any) => item[subject] === object)
          } else if (verb === '!=') {
            newData = newData.filter((item: any) => item[subject] !== object)
          }

          break

        default:
          break
      }
    })
    setFilteredItems(newData)
    setFilterStatements(statements)
  }

  const filterClear = intl.formatMessage(titlesIntl.filterClear)
  const filterAny = intl.formatMessage(titlesIntl.filterAny)
  const filterIs = intl.formatMessage(titlesIntl.filterIs)
  const filterIsNot = intl.formatMessage(titlesIntl.filterIsNot)
  const filterContains = intl.formatMessage(titlesIntl.filterContains)
  const filterApply = intl.formatMessage(titlesIntl.filterApply)

  const filters = {
    alwaysVisibleFilters: ['productId', 'productName'],
    statements: filterStatements,
    onChangeStatements: handleFiltersChange,
    clearAllFiltersButtonLabel: filterClear,
    collapseLeft: true,
    submitFilterLabel: filterApply,
    options: {
      productId: {
        label: intl.formatMessage(titlesIntl.productsTableProductId),
        ...simpleInputVerbsAndLabel(),
      },
      productName: {
        label: intl.formatMessage(titlesIntl.productsTableProductName),
        ...simpleInputVerbsAndLabel(),
      },
    },
  }

  function simpleInputObject({ values, onChangeObjectCallback }: any) {
    return (
      <Input
        value={values || ''}
        onChange={(e: any) => onChangeObjectCallback(e.target.value)}
      />
    )
  }

  function simpleInputVerbsAndLabel() {
    return {
      renderFilterLabel: (st: any) => {
        if (!st || !st.object) {
          // you should treat empty object cases only for alwaysVisibleFilters
          return filterAny
        }

        return `${
          st.verb === '='
            ? filterIs
            : st.verb === '!='
            ? filterIsNot
            : filterContains
        } ${st.object}`
      },
      verbs: [
        {
          label: filterIs,
          value: '=',
          object: {
            renderFn: simpleInputObject,
            extraParams: {},
          },
        },
        {
          label: filterIsNot,
          value: '!=',
          object: {
            renderFn: simpleInputObject,
            extraParams: {},
          },
        },
        {
          label: filterContains,
          value: 'contains',
          object: {
            renderFn: simpleInputObject,
            extraParams: {},
          },
        },
      ],
    }
  }

  const density = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
  }

  return (
    <div>
      <Table measures={measures} columns={columns} items={slicedItems}>
        <Table.Pagination {...pagination} />
        <Table.Toolbar>
          <Table.FilterBar {...filters} />
          <Table.Toolbar.ButtonGroup>
            <Table.Toolbar.ButtonGroup.Density {...density} />
          </Table.Toolbar.ButtonGroup>
        </Table.Toolbar>
      </Table>
    </div>
  )
}

function usePagination(initialSize: number, itemsToPaginate: any) {
  const [state, setState] = useState({
    tableSize: initialSize,
    currentPage: 1,
    currentItemFrom: 1,
    currentItemTo: initialSize,
    slicedItems: [...itemsToPaginate].slice(0, initialSize),
  })

  /** resets state on items change */
  useEffect(() => {
    setState({
      tableSize: initialSize,
      currentPage: 1,
      currentItemFrom: 1,
      currentItemTo: initialSize,
      slicedItems: [...itemsToPaginate].slice(0, initialSize),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsToPaginate])

  /** gets the next page */
  const onNextClick = useCallback(() => {
    const newPage = state.currentPage + 1
    const itemFrom = state.currentItemTo + 1
    const itemTo = state.tableSize * newPage
    const newItems = [...itemsToPaginate].slice(itemFrom - 1, itemTo)

    setState({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    })
  }, [state, itemsToPaginate])

  /** gets the previous page */
  const onPrevClick = useCallback(() => {
    if (state.currentPage === 0) return
    const newPage = state.currentPage - 1
    const itemFrom = state.currentItemFrom - state.tableSize
    const itemTo = state.currentItemFrom - 1
    const newItems = [...itemsToPaginate].slice(itemFrom - 1, itemTo)

    setState({
      ...state,
      currentPage: newPage,
      currentItemFrom: itemFrom,
      currentItemTo: itemTo,
      slicedItems: newItems,
    })
  }, [state, itemsToPaginate])

  /** deals rows change of Pagination component */
  const onRowsChange = useCallback(
    (_, value) => {
      const rowValue = parseInt(value, 10)

      setState({
        ...state,
        tableSize: rowValue,
        currentItemTo: rowValue,
        slicedItems: [...itemsToPaginate].slice(
          state.currentItemFrom - 1,
          rowValue
        ),
      })
    },
    [state, itemsToPaginate]
  )

  return {
    onNextClick,
    onPrevClick,
    onRowsChange,
    ...state,
  }
}
