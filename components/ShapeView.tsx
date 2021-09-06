import React, { FC } from 'react'
import { NoChild } from '../lib/reactutil/NoChild'
import { ShapeItem } from '../lib/shapez/ShapeItem'
import { ShapeSectorView } from './ShapeSectorView'

interface P {
  shape: ShapeItem
}

export const ShapeView: FC<P & NoChild> = ({ shape }) => {
  return (
    <g>
      {
        shape.layers.map((layer, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <g key={i} transform={`scale(${0.8 ** i})`}>
            {layer.sectors.map((sector, j) => (
              // eslint-disable-next-line react/no-array-index-key
              <g key={j} transform={`rotate(${90 * j})`}>
                <ShapeSectorView sector={sector} />
              </g>
            ))}
          </g>
        ))
      }
    </g>
  )
}
