import fs from 'node:fs'
import path from 'node:path'

const themeRoot = path.resolve('src/style/themes/kateholthe')
const suppliedColors = [
  '#ff6200',
  '#ff711a',
  '#e65800',
  '#b34400',
  '#f64505',
  '#ff4600',
  '#fa490e',
  '#f96c1a',
  '#ff6a14',
  '#ff5600',
  '#fd7133',
  '#f96900',
  '#e95c00',
  '#ecf9f8',
  '#daeeec',
  '#bcdcd9',
  '#96c8c4',
  '#6bb1ac',
  '#3c9893',
  '#277d78',
  '#1e625f',
  '#174947',
  '#0f3230',
  '#091d1c',
  '#040d0d',
  '#ebf3f1',
  '#cee4dd',
  '#acd5ca',
  '#87c8b7',
  '#60b9a2',
  '#3da98f',
  '#16977d',
  '#01846c',
  '#00715d',
  '#005e4e',
  '#024c40',
  '#0a3931',
  '#032924',
  '#011a17',
  '#010b09',
  '#f7f6f3',
  '#f0eee9',
  '#e5e2d9',
]

describe('Kate Holthe token source', () => {
  it('retains every literal color supplied by the user', () => {
    const source = fs
      .readFileSync(
        path.join(themeRoot, 'source/foundation.tokens.json'),
        'utf8'
      )
      .toLowerCase()

    for (const color of suppliedColors) {
      expect(source).toContain(`"hex": "${color}"`)
    }
  })
})
