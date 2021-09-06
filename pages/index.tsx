import React, { FormEventHandler, useState } from 'react'
import { BasePage } from '../components/BasePage'
import { NoChild } from '../lib/reactutil/NoChild'
import { ShapeItem } from '../lib/shapez/ShapeItem'

const PageIndex: React.FC<NoChild> = () => {
  const [shape, setShape] = useState<ShapeItem>()

  const handleInput: FormEventHandler<HTMLTextAreaElement> = (ev) => {
    try {
      setShape(ShapeItem.fromCode(ev.currentTarget.value))
    } catch (err) {
      console.error(err)
      setShape(undefined)
    }
  }

  return (
    <BasePage>
      <textarea onInput={handleInput} />
      {shape?.code()}
    </BasePage>
  )
}

export default PageIndex
