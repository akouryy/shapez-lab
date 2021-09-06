import React, { FC } from 'react'
import { NoChild } from '../lib/reactutil/NoChild'
import { Color, Sector } from '../lib/shapez/ShapeItem'

interface P {
  sector: Sector | null
}

export const SIZE = 100

const FILL_COLORS: Record<Color, string> = {
  uncolored: '#999',
  red: '#f66',
  green: '#6f6',
  blue: '#66f',
  yellow: '#ff6',
  purple: '#f6f',
  cyan: '#6ff',
  white: '#fff',
} as const

export const ShapeSectorView: FC<P & NoChild> = ({ sector }) => {
  const S = SIZE

  return (
    <g>
      {sector && (
        <path
          d={
            sector.figure === 'circle' ? `M 0 0 L 0 ${-S} a ${S} ${S} -90 0 1 ${S} ${S} z` :
              sector.figure === 'rectangle' ? `M 0 0 V ${-S} H ${S} V 0 z` :
                sector.figure === 'star' ? `M 0 0 V ${-S * 0.65} L ${S} ${-S} L ${S * 0.65} 0 z` :
                  `M 0 0 V ${-S * 0.4} L ${S} ${-S} V 0 z`
          }
          fill={FILL_COLORS[sector.color]}
          stroke='#555'
          strokeLinejoin='round'
          strokeWidth={S / 10}
        />
      )}
    </g>
  )
}
