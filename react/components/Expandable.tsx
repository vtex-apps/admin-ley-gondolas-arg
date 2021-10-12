/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import { Checkbox } from 'vtex.styleguide'

import arrow from '../../assets/categoryTree/arrowCategoryTree.svg'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Expandable = ({ title, content, checked, setChecked, open }: any) => {
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: open,
  })

  const [rotation, setRotation] = useState<number>(open ? 90 : 0)
  const [isRotate, setIsRotate] = useState<boolean>(open)

  const rotate = () => {
    const angle = !isRotate ? 90 : -90
    let newRotation = rotation + angle

    if (newRotation >= 360) {
      newRotation = -360
    }

    setIsRotate(!isRotate)
    setRotation(newRotation)
  }

  const titleElement = (
    <li className="flex items-center">
      <span className="flex mb1 pa3 br2 c-emphasis hover-c-emphasis active-c-emphasis dib mr5 mv0 ba b--emphasis hover-b-emphasis active-b-emphasis">
        <div className="mr3 mt1">
          <Checkbox
            id={title}
            checked={checked === title}
            onChange={() => {
              setChecked(title)
            }}
          />
        </div>
        <div aria-hidden="true" onClick={() => rotate()}>
          <div {...getToggleProps()}>{title}</div>
        </div>
      </span>
      <div {...getToggleProps()}>
        {content && (
          <img
            id={title}
            width="15rem"
            src={arrow}
            alt="arrow"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={() => rotate()}
          />
        )}
      </div>
    </li>
  )

  const contentUl = <ul {...getCollapseProps()}>{content}</ul>

  return (
    <>
      {title && titleElement}
      {content && contentUl}
    </>
  )
}

export default Expandable
