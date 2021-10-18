/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import { Checkbox } from 'vtex.styleguide'

// import arrow from '../../assets/categoryTree/arrowCategoryTree.svg'

const Expandable = ({
  id,
  title,
  content,
  checked,
  setChecked,
  setCheckedId,
  open,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
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
              setCheckedId(parseInt(id, 0))
            }}
          />
        </div>
        <div aria-hidden="true" onClick={() => rotate()}>
          <div {...getToggleProps()}>{title}</div>
        </div>
      </span>
      <div {...getToggleProps()}>
        {content && (
          <div
            tabIndex={id}
            role="button"
            id={title}
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={() => rotate()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 477.175 477.175"
              width="1rem"
            >
              <path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z" />
            </svg>
          </div>
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
