/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import Expandable from './Expandable'

export default function RecursiveChildenList({
  category,
}: RecursiveChildenListProps) {
  console.info('category', category)

  function createRecursiveChildenList2(
    categoryRecursive: CategoryChildenListProps[]
  ) {
    return categoryRecursive.map((categoryOfList: CategoryChildenListProps) => (
      <Expandable
        key={`${categoryOfList.id}`}
        title={categoryOfList.name}
        content={createRecursiveChildenList2(categoryOfList.children)}
      />
    ))
  }

  return <div>{createRecursiveChildenList2(category)}</div>
}
