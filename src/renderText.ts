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
      return `${(entry.value / entry.max * 100).toFixed(entry.digits || 0)}%`
    case 'number':
      if (entry.max === 1) {
        return entry.value === 1 ? '1' : entry.value.toFixed(entry.digits || 1)
      }
      else if (entry.max < 1) {
        return entry.value.toFixed(entry.digits || (entry.max - Math.trunc(entry.max)).toString().length - 1)
      }
      else
        return entry.value.toFixed(entry.digits || 0)
    case 'ratio':
      if (entry.max === 1) {
        return `${entry.value.toFixed(entry.digits || 1)}/${entry.max}`
      }
      else if (entry.max < 1) {
        return `${entry.value.toFixed(entry.digits || (entry.max - Math.trunc(entry.max)).toString().length - 1)}/${entry.max}`
      }
      else {
        return `${entry.value.toFixed(entry.digits || 0)}/${entry.max}`
      }
  }
}
