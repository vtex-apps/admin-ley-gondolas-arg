/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'

import Expandable from './Expandable'

export default function RecursiveChildenList({
  category,
  selectedCategory,
  setSelectedCategory,
}: RecursiveChildenListProps) {
  const [checked, setChecked] = useState<string>(selectedCategory)

  useEffect(() => {
    setSelectedCategory(checked)
  }, [checked, setSelectedCategory])

  function createRecursiveChildenList(
    categoryRecursive: CategoryChildenListProps[]
  ) {
    function doCheckOpen(categoryToCheck: CategoryChildenListProps): boolean {
      return categoryToCheck.children.some(
        (c) => c.name === checked || doCheckOpen(c)
      )
    }

    return categoryRecursive.map((categoryOfList: CategoryChildenListProps) => (
      <Expandable
        key={`${categoryOfList.id}`}
        title={categoryOfList.name}
        checked={checked}
        setChecked={setChecked}
        open={doCheckOpen(categoryOfList)}
        content={
          categoryOfList.children.length > 0 &&
          createRecursiveChildenList(categoryOfList.children)
        }
      />
    ))
  }

  return <div>{createRecursiveChildenList(category)}</div>
}
