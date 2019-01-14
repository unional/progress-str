import { BarFormat, BaseOptions } from './interfaces';
import { renderText } from './renderText';
import { ValueEntry } from './ValueEntry';
import { calcBarLength } from './calcBarLength';
import stringLength from 'string-length'

export function renderBar(baseOptions: BaseOptions, entries: ValueEntry[]) {
  if (baseOptions.textPosition === 'none') return toBar(baseOptions.length, baseOptions.bar, entries)

  const text = renderText(baseOptions, entries)

  const barLength = calcBarLength(baseOptions.length, stringLength(text))
  const bar = toBar(barLength, baseOptions.bar, entries)

  return baseOptions.textPosition === 'left' ? `${text} ${bar}` : `${bar} ${text}`
}


function toBar(length: number, format: BarFormat, entries: ValueEntry[]) {
  const barInsideLength = length - stringLength(format.leftBracketMarker) - stringLength(format.rightBracketMarker)
  const normalizedEntries = entries.map(e => (
    { ...e, value: e.value === undefined ? undefined : Math.floor(Math.min(Math.max(e.value / e.max, 0), 1) * 100) / 100 }
  ))
  const bar = createBarArray(normalizedEntries, format, barInsideLength)
  return `${format.leftBracketMarker}${bar.join('')}${format.rightBracketMarker}`
}

function createBarArray(entries: ValueEntry[], { completedMarker, incompleteMarker }: BarFormat, length: number) {
  const sortedEntries = entries
    .filter(e => e.value !== undefined)
    .map(e => ({ ...e, value: e.value! * length }))
    .sort((a, b) => a.value - b.value)

  const bar: string[] = []
  let i = 0
  while (sortedEntries.length) {
    const entry = sortedEntries.shift()!
    while (entry.value - i > 1) {
      // don't mark completed if bar[i] is already marked by previous entry
      if (!bar[i]) bar[i] = completedMarker
      i++
    }
    if (i !== length) {
      bar[i] = entry.marker
    }
  }

  while (bar.length < length) {
    bar[bar.length] = incompleteMarker
  }
  return bar
}
