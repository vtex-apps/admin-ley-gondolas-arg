/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EXPERIMENTAL_Table as Table,
  Input,
  Button,
  Tag,
} from 'vtex.styleguide'
import useTableMeasures from '@vtex/styleguide/lib/EXPERIMENTAL_Table/hooks/useTableMeasures'
import React, { useState, useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'

import { titlesIntl } from '../utils/intl'
import CategoriesTree from './CategorieTree'
import ProductSearch from './ProductSearch'

export default function CategoriesTable({
  categoriesList,
}: CategoriesTableProps) {
  const intl = useIntl()
  const [items, setItems] = useState<CategoriesRow[]>(categoriesList)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [nameCategoryClick, setNameCategoryClick] = useState('')
  const [rowCategoryClick, setRowCategoryClick] = useState(-1)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [nameProductClick, setNameProductClick] = useState('')
  const [idProductClick, setIdProductClick] = useState('')
  const [rowProductClick, setRowProductClick] = useState(-1)
  const columns = [
    {
      id: 'categorieLaw',
      title: intl.formatMessage(titlesIntl.categoriesTableCategorieLaw),
    },
    {
      id: 'categorieCatalog',
      title: intl.formatMessage(titlesIntl.categoriesTableCategorieCatalog),
      cellRenderer: ({ data }: any) => {
        return (
          <div>
            <div className="flex justify-left">
              {data.name && <Tag bgColor="#F71963">{data.name}</Tag>}
            </div>
            <div className="mt1">
              <Button
                variation="secondary"
                size="small"
                onClick={() => handleModalCategorieCatalog(data)}
              >
                {!data.name &&
                  `${intl.formatMessage(titlesIntl.selectCategory)}`}
                {data.name &&
                  `${intl.formatMessage(titlesIntl.changeCategory)}`}
              </Button>
            </div>
          </div>
        )
      },
    },
    {
      id: 'bestLowerProduct',
      title: intl.formatMessage(titlesIntl.categoriesTableBestLowerProduct),
      cellRenderer: ({ data }: any) => {
        return (
          <div>
            <div className="flex justify-left">
              {data.name && (
                <Tag bgColor="#F71963">{`${intl.formatMessage(
                  titlesIntl.lastSeen
                )}: ${data.name}`}</Tag>
              )}
            </div>
            <div className="mt1">
              <Button
                variation="secondary"
                size="small"
                onClick={() => handleModalProducts(data)}
              >
                {intl.formatMessage(titlesIntl.showProduct)}
              </Button>
            </div>
          </div>
        )
      },
    },
  ]

  const handleModalCategorieCatalog = (categorieCatalog: any) => {
    setRowCategoryClick(categorieCatalog.idRow)
    setNameCategoryClick(categorieCatalog.name)
    setIsCategoryModalOpen(!isCategoryModalOpen)
  }

  const handleModalProducts = (product: any) => {
    setRowProductClick(product.idRow)
    setIdProductClick(product.id)
    setNameProductClick(product.name)
    setIsProductModalOpen(!isProductModalOpen)
  }

  const [filteredItems, setFilteredItems] = useState(items)
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
    let newData = items.slice()

    statements.forEach((st: any) => {
      if (!st || !st.object) return
      const { subject, verb, object } = st

      switch (subject) {
        case 'categorieLaw':
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
    alwaysVisibleFilters: ['categorieLaw'],
    statements: filterStatements,
    onChangeStatements: handleFiltersChange,
    clearAllFiltersButtonLabel: filterClear,
    collapseLeft: true,
    submitFilterLabel: filterApply,
    options: {
      categorieLaw: {
        label: intl.formatMessage(titlesIntl.categoriesTableCategorieLaw),
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

  useEffect(() => {
    const filterBar = document.getElementById('vtex-table-v2__filter-bar')

    filterBar?.classList.remove('mb5')
  }, [])

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
      {isCategoryModalOpen && (
        <CategoriesTree
          idRow={rowCategoryClick}
          nameCategory={nameCategoryClick}
          items={items}
          setItems={setItems}
          closeModal={handleModalCategorieCatalog}
        />
      )}
      {isProductModalOpen && (
        <ProductSearch
          idRow={rowProductClick}
          nameProduct={nameProductClick}
          idProduct={idProductClick}
          items={items}
          setItems={setItems}
          closeModal={handleModalProducts}
        />
      )}
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
