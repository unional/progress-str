import { BarFormat, BaseOptions } from './interfaces';
import { renderText } from './renderText';
import { ValueEntry } from './ValueEntry';
import { calcBarLength } from './calcBarLength';
import stringLength from 'string-length'

export function renderBar(baseOptions: BaseOptions, entries: ValueEntry[]) {

  const percentStr = renderText(baseOptions, entries)

  const barLength = calcBarLength(baseOptions.length, stringLength(percentStr))
  const bar = toBar(barLength, baseOptions.bar, entries)

  return baseOptions.textPosition === 'left' ? `${percentStr} ${bar}` : `${bar} ${percentStr}`
}


function toBar(length: number, format: BarFormat, entries: ValueEntry[]) {
  const barInsideLength = length - stringLength(format.leftBracketMarker) - stringLength(format.rightBracketMarker)
  const normalizedEntries = entries.map(e => ({ ...e, value: e.value / e.max }))
  const bar = createBarArray(normalizedEntries, format, barInsideLength)
  return `${format.leftBracketMarker}${bar.join('')}${format.rightBracketMarker}`
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
