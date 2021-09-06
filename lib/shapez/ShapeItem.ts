import { times } from 'lodash'
import { assert } from '../util'

export const Figures = ['circle', 'rectangle', 'star', 'windmill'] as const

export type Figure = typeof Figures extends ReadonlyArray<infer C> ? C : never

export function figureToCode(f: Figure): string {
  return f[0].toLocaleUpperCase()
}

export function figureFromCode(code: string): Figure {
  const f0 = Figures.find((f) => figureToCode(f) === code)
  if(!f0) { throw new SyntaxError(`invalid figure: "${code}"`) }
  return f0
}

export const Colors = ['uncolored', 'red', 'green', 'blue', 'yellow', 'purple', 'cyan', 'white'] as const

export type Color = typeof Colors extends ReadonlyArray<infer C> ? C : never

export function colorToCode(c: Color): string {
  return c[0]
}

export function colorFromCode(code: string): Color {
  const c0 = Colors.find((c) => colorToCode(c) === code)
  if(!c0) { throw new SyntaxError(`invalid color: "${code}"`) }
  return c0
}

export class Sector {
  constructor(readonly figure: Figure, readonly color: Color) {}

  code(): string {
    return figureToCode(this.figure) + colorToCode(this.color)
  }

  static fromCode(code: string): Sector | null {
    if(code.length !== 2) { throw new SyntaxError(`invalid sector code: "${code}"`) }
    if(code === '--') { return null }
    return new Sector(figureFromCode(code[0]), colorFromCode(code[1]))
  }
}

export class Layer {
  constructor(readonly sectors: Array<Sector | null>) {
    assert(sectors.length === 4, 'length of sectors must be 4')
  }

  code(): string {
    return this.sectors.map((s) => (s ? s.code() : '--')).join('')
  }

  static fromCode(this: void, code: string): Layer {
    const sectors = Array<Sector | null>()

    for(let i = 0; i < code.length; ++i) {
      if(sectors.length >= 4) { throw new SyntaxError(`too many sectors: "${code}"[${i}]`) }
      if(code[i] === '*') {
        if(sectors.length === 0) { throw new SyntaxError(`nothing to repeat: "${code}"[${i}]`) }
        times(4, (j) => { sectors[j] ??= sectors[0] })
      } else if('1' <= code[i] && code[i] <= '3') {
        const j = +code[i] - 1
        if(j >= sectors.length) { throw new SyntaxError(`sector #${j + 1} not defined yet: "${code}"[${i}]`) }
        sectors.push(sectors[j])
      } else {
        sectors.push(Sector.fromCode(code.substr(i, 2)))
        ++i // i += 2 in total
      }
    }
    return new Layer(sectors)
  }
}

export class ShapeItem {
  constructor(readonly layers: Layer[]) {}

  code(): string {
    return this.layers.map((l) => l.code()).join(':')
  }

  static fromCode(code: string): ShapeItem {
    return new ShapeItem(code.split(':').map(Layer.fromCode))
  }
}
