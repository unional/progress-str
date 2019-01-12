import { BarFormat, BaseOptions, ValueOptions } from './interfaces';


export type ValueEntry = ValueOptions & { value: number }


export function renderBar(baseOptions: BaseOptions, ...entries: ValueEntry[]) {

  const percentStr = entries.map(e => formatText(baseOptions, e)).join(' ')

  const spaceLength = 1
  const bar = toBar(baseOptions.length - percentStr.length - spaceLength, baseOptions.bar, entries)

  return baseOptions.textPosition === 'left' ? `${percentStr} ${bar}` : `${bar} ${percentStr}`
}

function formatText(options: Pick<BaseOptions, 'textStyle'>, entry: ValueEntry) {
  switch (options.textStyle) {
    case 'percentage':
      return `${(entry.value / entry.max * 100).toFixed(entry.digits)}%`
    case 'number':
      return (entry.value).toFixed(entry.digits)
    case 'ratio':
      return `${entry.value.toFixed(entry.digits)}/${entry.max}`
  }
}

function toBar(length: number, format: BarFormat, entries: ValueEntry[]) {
  const bracketLength = 1
  const barInsideLength = length - bracketLength * 2
  const normalizedEntries = entries.map(e => ({ ...e, value: e.value / e.max }))
  const bar = createBarArray(normalizedEntries, format, barInsideLength)
  return `[${bar.join('')}]`
}

function createBarArray(entries: ValueEntry[], { completedMarker, incompleteMarker }: BarFormat, length: number) {
  const sortedEntries = entries
    .map(e => ({ ...e, value: Math.round(Math.min(1, e.value) * (length - 1)) }))
    .sort((a, b) => a.value - b.value)

  const bar: string[] = []
  let i = 0
  while (sortedEntries.length) {
    const entry = sortedEntries.shift()!
    while (i < entry.value) {
      bar[i] = completedMarker
      i++
    }
    if (i === entry.value) {
      bar[i] = entry.marker
      i++
    }
  }

  while (bar.length < length) {
    bar[bar.length] = incompleteMarker
  }
  return bar
}
