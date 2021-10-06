import React from 'react'
import useCollapse from 'react-collapsed'

const Expandable = ({ title, content }: any) => {
  const { getCollapseProps, getToggleProps } = useCollapse({})

  return (
    <>
      <div {...getToggleProps()}>{title && <li>{title}</li>}</div>
      <ul {...getCollapseProps()}>{content}</ul>
    </>
  )
}

export default Expandable
