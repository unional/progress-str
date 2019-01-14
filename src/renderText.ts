import { BaseOptions } from './interfaces';
import { ValueEntry } from './ValueEntry';
import leftPad from 'left-pad'
import rightPad from 'right-pad'

export function renderText(baseOptions: BaseOptions, entries: ValueEntry[]) {
  return entries.map(e => renderEntry(baseOptions.textAlign, e)).join(' ')
}
function renderEntry(align: 'left' | 'right', entry: ValueEntry) {
  const formatted = formatText(entry)
  const text = entry.textTransform ? entry.textTransform(formatted) : formatted
  return align === 'left' ? rightPad(text, entry.maxLength) : leftPad(text, entry.maxLength)
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
