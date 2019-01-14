import { BaseOptions } from './interfaces';
import { ValueEntry } from './ValueEntry';

export function renderText(baseOptions: BaseOptions, entries: ValueEntry[]) {
  return entries.map(e => renderEntry(e)).join(' ')
}
function renderEntry(entry: ValueEntry) {
  const result = formatText(entry)
  return entry.textTransform ? entry.textTransform(result) : result
}

function formatText(entry: ValueEntry) {
  switch (entry.textStyle) {
    case 'percentage':
      return `${(entry.value / entry.max * 100).toFixed(entry.actualDigits)}%`
    case 'number':
      return entry.value.toFixed(entry.actualDigits)
    case 'ratio':
      return `${entry.value.toFixed(entry.actualDigits)}/${entry.digits !== undefined ? entry.max.toFixed(entry.actualDigits) : entry.max}`
  }
}
