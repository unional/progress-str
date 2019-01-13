import { BaseOptions } from './interfaces';
import { ValueEntry } from './ValueEntry';

export function renderText(baseOptions: BaseOptions, entries: ValueEntry[]) {
  return baseOptions.textTransform ?
    entries.map(e => baseOptions.textTransform!(formatText(baseOptions, e))).join(' ') :
    entries.map(e => formatText(baseOptions, e)).join(' ')
}
function formatText(options: Pick<BaseOptions, 'textStyle'>, entry: ValueEntry) {
  switch (options.textStyle) {
    case 'percentage':
      return `${(entry.value / entry.max * 100).toFixed(entry.digits || 0)}%`
    case 'number':
      if (entry.max === 1) {
        return entry.value.toFixed(entry.digits || 1)
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
