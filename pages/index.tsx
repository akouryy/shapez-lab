import React, { FormEventHandler, useState } from 'react'
import { BasePage } from '../components/BasePage'
import { ShapeView } from '../components/ShapeView'
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
      <div>
        {shape && (
          <svg style={{ maxHeight: '300px' }} viewBox='-120 -120 240 240'>
            <ShapeView shape={shape} />
          </svg>
        )}
      </div>
    </BasePage>
  )
}

export default PageIndex
