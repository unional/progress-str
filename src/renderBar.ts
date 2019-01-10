import { BarFormat, ValueOptions } from './interfaces';

export type RenderBarOptions = {
  length: number
  valuePosition: 'left' | 'right'
  barFormat: BarFormat
}

export type ValueEntry = ValueOptions & { value: number }


export function renderBar(options: RenderBarOptions, ...entries: ValueEntry[]) {

  const normalizedEntries = entries.map(e => ({ ...e, value: e.value / e.max }))
  const percentStr = normalizedEntries.map(p => toStringPercentage(p.value, 1)).join(' ')

  const spaceLength = 1
  const bar = toBar(options.length - percentStr.length - spaceLength, options.barFormat, normalizedEntries)

  return options.valuePosition === 'left' ? `${percentStr} ${bar}` : `${bar} ${percentStr}`
}

function toStringPercentage(value: number, fractionDigits: number) {
  return `${(value * 100).toFixed(fractionDigits)}%`
}

function toBar(length: number, format: BarFormat, entries: ValueEntry[]) {
  const bracketLength = 1
  const barInsideLength = length - bracketLength * 2
  const bar = createBarArray(entries, format, barInsideLength)
  return `[${bar.join('')}]`
}

function createBarArray(entries: ValueEntry[], { completedChar, incompleteChar }: { completedChar: string, incompleteChar: string }, length: number) {
  const sortedEntries = entries
    .map(p => ({ ...p, value: Math.round(p.value * (length - 1)) }))
    .sort((a, b) => a.value - b.value)

  const bar: string[] = []
  let i = 0
  while (sortedEntries.length) {
    const entry = sortedEntries.shift()!
    while (i < entry.value) {
      bar[i] = completedChar
      i++
    }
    if (i === entry.value) {
      bar[i] = entry.char
      i++
    }
  }

  while (bar.length < length) {
    bar[bar.length] = incompleteChar
  }
  return bar
}
