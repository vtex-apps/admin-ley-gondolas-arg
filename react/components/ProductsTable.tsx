/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EXPERIMENTAL_Table as Table,
  Input,
  Link,
  ButtonWithIcon,
} from 'vtex.styleguide'
import Edit from '@vtex/styleguide/lib/icon/Edit'
import Check from '@vtex/styleguide/lib/icon/Check'
import useTableMeasures from '@vtex/styleguide/lib/EXPERIMENTAL_Table/hooks/useTableMeasures'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useMutation } from 'react-apollo'

import updateDocument from '../graphql/updateDocument.gql'
import createDocument from '../graphql/createDocument.gql'
import { titlesIntl } from '../utils/intl'
import SaveInMasterdata from './SaveInMasterdata'
import { ProductContext } from '../store/context/ProductContext'

export default function ProductsTable({
  listOfProducts,
  items,
  setItems,
}: ProductTableProps) {
  const intl = useIntl()
  const { workspace, account } = useRuntime()
  const { state, dispatch } = useContext(ProductContext)

  const [updateDocumentMutation] = useMutation(updateDocument)

  const [createDocumentMutation] = useMutation(createDocument)
  const columns = [
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
      id: 'catalog',
      title: intl.formatMessage(titlesIntl.showInCatalog),
      cellRenderer: ({ data }: any) => {
        const editIcon = <Edit />

        return (
          <div className="flex justify-center">
            <ButtonWithIcon
              href={`/admin/Site/ProdutoForm.aspx?id=${data.productId}`}
              target="_blank"
              variation="secondary"
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              onClick={() => handleClickSeeCatalog(data)}
              icon={editIcon}
            />
          </div>
        )
      },
    },
    {
      id: 'productName',
      title: intl.formatMessage(titlesIntl.productsTableProductName),
      cellRenderer: ({ data }: any) => {
        const domain =
          workspace === 'master'
            ? `https://${account}.myvtex.com/`
            : `https://${workspace}--${account}.myvtex.com/`

        return (
          <Link href={`${domain}${data.link}/p`} target="_blank" mediumWeigth>
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
      id: 'bestLowerPrice',
      title: intl.formatMessage(titlesIntl.productsTableMejorMenorPrecio),
      cellRenderer: ({ data }: any) => {
        const checkIcon = <Check />

        const checkData = data ? data.includes('Mejor Menor Precio') : false

        return (
          <div className="flex justify-center">
            {checkData && (
              <div className="flex pa2 br2 bg-action-primary c-on-action-primary active-c-on-action-primary dib">
                {checkIcon}
              </div>
            )}
            {!checkData && (
              <div className="flex pa2 br2 c-action-primary active-c-action-primary dib mv0 ba b--action-primary">
                <svg
                  viewBox="0 0 12 12"
                  width="16"
                  height="16"
                  className="vtex__icon-check"
                />
              </div>
            )}
          </div>
        )
      },
    },
    {
      id: 'pymes',
      title: intl.formatMessage(titlesIntl.productsTablePyMEs),
      cellRenderer: ({ data }: any) => {
        const checkIcon = <Check />

        const checkData = data ? data.includes('PyMEs') : false

        return (
          <div className="flex justify-center">
            {checkData && (
              <div className="flex pa2 br2 bg-action-primary c-on-action-primary active-c-on-action-primary dib">
                {checkIcon}
              </div>
            )}
            {!checkData && (
              <div className="flex pa2 br2 c-action-primary active-c-action-primary dib mv0 ba b--action-primary">
                <svg
                  viewBox="0 0 12 12"
                  width="16"
                  height="16"
                  className="vtex__icon-check"
                />
              </div>
            )}
          </div>
        )
      },
    },
    {
      id: 'brand',
      title: intl.formatMessage(titlesIntl.productsTableBrand),
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

  useEffect(() => {
    setFilteredItems(listOfProducts)
  }, [listOfProducts])

  // const [filterStatements, setFilterStatements] = useState(state.statements)
  const { state: paginationState } = useContext(ProductContext)
  const ITEMS_PER_PAGE = paginationState.limit

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
    totalItems: paginationState.totalItems,
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
    if (statements.length === 0) {
      dispatch({ type: 'SET_STATEMENTS', payload: statements })
      dispatch({ type: 'SET_PARAMS', payload: "" })
    }

    statements.forEach((st: any) => {
      if (!st || !st.object) return
      const { subject, verb, object } = st

      switch (subject) {
        case 'productName':
          if (verb === 'contains') {
            dispatch({ type: 'SET_STATEMENTS', payload: statements })
            dispatch({ type: 'SET_PARAMS', payload: object })
          }

          break

        default:
          break
      }
    })
    setFilteredItems(newData)
  }

  const filterClear = intl.formatMessage(titlesIntl.filterClear)
  const filterAny = intl.formatMessage(titlesIntl.filterAny)
  const filterIs = intl.formatMessage(titlesIntl.filterIs)
  const filterIsNot = intl.formatMessage(titlesIntl.filterIsNot)
  const filterContains = intl.formatMessage(titlesIntl.filterContains)
  const filterApply = intl.formatMessage(titlesIntl.filterApply)

  const filters = {
    alwaysVisibleFilters: [/* 'productId', */ 'productName'],
    statements: state.statements,
    onChangeStatements: handleFiltersChange,
    clearAllFiltersButtonLabel: filterClear,
    collapseLeft: true,
    submitFilterLabel: filterApply,
    options: {
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

        return `${st.verb === '='
          ? filterIs
          : st.verb === '!='
            ? filterIsNot
            : filterContains
          } ${st.object}`
      },
      verbs: [
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

  const customEmptyState = {
    label: intl.formatMessage(titlesIntl.noProducts),

  }

  return (
    <div>
      <Table
        measures={measures}
        columns={columns}
        items={slicedItems}
        empty={slicedItems.length === 0}
        emptyState={customEmptyState}
      >
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
  const { dispatch, state: paginationState } = useContext(ProductContext)
  const state = ({
    tableSize: initialSize,
    currentPage: paginationState.currentPage,
    currentItemFrom: paginationState.from,
    currentItemTo: paginationState.to,
    selectedOption: paginationState.limit,
    slicedItems: [...itemsToPaginate]
  })

  /** gets the next page */
  const onNextClick = useCallback(() => {
    dispatch({ type: 'INCREASE_PAGE' })
  }, [state, itemsToPaginate])

  /** gets the previous page */
  const onPrevClick = useCallback(() => {

    if (state.currentPage === 0) return
    dispatch({ type: 'DECREASE_PAGE' })


  }, [state, itemsToPaginate])

  /** deals rows change of Pagination component */
  const onRowsChange = useCallback(
    (_, value) => {
      const rowValue = parseInt(value, 10)
      dispatch({ type: 'SET_LIMIT', payload: rowValue })
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
