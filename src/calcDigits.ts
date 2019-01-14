import { ValueOptions } from './interfaces';

export function getLongestSampleText(options: ValueOptions, actualDigits: number) {
  switch (options.textStyle) {
    case 'percentage':
      return `${addDigits(100, actualDigits)}%`
    case 'number':
      const max = options.max === undefined ? 1 : options.max
      if (hasDecimal(max)) {
        const round = Math.trunc(max)
        return `${addDigits(round, actualDigits)}`
      }
      else if (max === 1) {
        return `${addDigits(0, actualDigits)}`
      }
      else {
        return `${addDigits(max, actualDigits)}`
      }
    case 'ratio':
      if (hasDecimal(options.max)) {
        const round = Math.trunc(options.max!)
        return `${addDigits(round, actualDigits)}/${options.max}`
      }
      else if (options.max === 1) {
        return `${addDigits(0, actualDigits)}/${addDigits(0, options.digits || 0)}`
      }
      else {
        return `${addDigits(options.max, actualDigits)}/${options.max === undefined ? '---' : options.max.toFixed(actualDigits)}`
      }
  }
}

export function calcMaxDigits(options: ValueOptions) {
  switch (options.textStyle) {
    case 'percentage':
      return options.digits || 0
    case 'number':
    case 'ratio':
      const max = options.max === undefined ? 1 : options.max
      if (hasDecimal(max)) {
        return options.digits || getDecimal(max) + 1
      }
      else if (max === 1) {
        return options.digits || 1
      }
      else {
        return options.digits || 0
      }
  }
}

function addDigits(value: number | undefined, digits: number) {
  if (value === undefined) return '---'
  if (digits === 0) return value
  return value + (1 / (10 ** digits))
}

function hasDecimal(value: number | undefined) {
  if (value === undefined) return false
  return Math.trunc(value) !== value
}

function getDecimal(value: number) {
  return (value - Math.trunc(value)).toString().length - 2
}
