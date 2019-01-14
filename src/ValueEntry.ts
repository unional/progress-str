import stringLength from 'string-length';
import { getLongestSampleText, calcMaxDigits } from './calcDigits';
import { ValueOptions } from './interfaces';

export type ValueEntry = ValueOptions & { value: number | undefined, actualDigits: number, maxLength: number }

export function createValueEntry(options: ValueOptions, value: number): ValueEntry {
  const actualDigits = calcMaxDigits(options)
  const maxLength = calcMaxLength(options, actualDigits)
  return {
    value,
    actualDigits,
    maxLength,
    ...options
  }
}

function calcMaxLength(options: ValueOptions, actualDigits: number) {
  const text = getLongestSampleText(options, actualDigits)
  return options.textTransform ? stringLength(options.textTransform(text)) : text.length
}
