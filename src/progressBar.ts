import { unpartialRecursively, unpartial } from 'unpartial';
import { RecursivePartial } from 'type-plus'
import { CurrentValueOutOfBound, MaxValueOutOfBound, StringTooLong } from './errors';

export type BarFormat = {
  completedChar: string
  incompleteChar: string
}

export type ValueFormat = {
  valueChar: string
}

export type ProgressBarOptions = {
  length: number
  maxValue: number
  barFormat: BarFormat
  valueFormat: ValueFormat
}

export type TwoValuesProgressBarOptions = {
  length: number
  maxValue: number
  barFormat: BarFormat
  valueFormat: ValueFormat | [ValueFormat, ValueFormat]
}

const defaultOptions: ProgressBarOptions = {
  length: 30,
  maxValue: 1,
  valueFormat: {
    valueChar: '|'
  },
  barFormat: {
    completedChar: '-',
    incompleteChar: '-'
  }
}

export function progressBar(options?: RecursivePartial<ProgressBarOptions>) {
  const { length, maxValue, valueFormat, barFormat } = extractOptions(options)
  return {
    render(value: number) {
      return progressBarPercent({ length, maxValue, barFormat }, { value, format: valueFormat })
    }
  }
}

export function twoValuesProgressBar(options?: RecursivePartial<TwoValuesProgressBarOptions>) {
  const { length, maxValue, valueFormats, barFormat } = extractTwoValuesOptions(options)

  return {
    render(value1: number, value2: number) {
      return progressBarPercent(
        { length, maxValue, barFormat },
        { value: value1, format: valueFormats[0] },
        { value: value2, format: valueFormats[1] })
    }
  }
}

function extractOptions(options?: RecursivePartial<ProgressBarOptions>) {
  const { length, maxValue, valueFormat, barFormat } = unpartialRecursively(defaultOptions, options)
  if (maxValue <= 0) throw new MaxValueOutOfBound(maxValue)
  validateBarFormat(barFormat)
  validateValueFormat(valueFormat)
  return {
    length,
    maxValue,
    barFormat,
    valueFormat
  }
}

function extractTwoValuesOptions(options?: RecursivePartial<TwoValuesProgressBarOptions>) {
  const { length, maxValue, valueFormat, barFormat } = unpartialRecursively(defaultOptions, options)
  if (maxValue <= 0) throw new MaxValueOutOfBound(maxValue)
  validateBarFormat(barFormat)
  const valueFormats = Array.isArray(valueFormat) ? [
    unpartial(defaultOptions.valueFormat, valueFormat[0]),
    unpartial(defaultOptions.valueFormat, valueFormat[1])
  ] : [valueFormat, valueFormat]
  validateValueFormat(valueFormats[0])
  validateValueFormat(valueFormats[1])
  return {
    length,
    maxValue,
    barFormat,
    valueFormats
  }
}

function validateValueFormat(format: Partial<ValueFormat>) {
  if (format.valueChar && format.valueChar.length > 1) throw new StringTooLong('valueChar', format.valueChar, 1)
}

function validateBarFormat(format: Partial<BarFormat>) {
  if (format.incompleteChar && format.incompleteChar.length > 1) throw new StringTooLong('incompleteChar', format.incompleteChar, 1)
  if (format.completedChar && format.completedChar.length > 1) throw new StringTooLong('completedChar', format.completedChar, 1)
}

function progressBarPercent(options: Pick<ProgressBarOptions, 'length' | 'maxValue' | 'barFormat'>, ...entries: Array<{ format: ValueFormat, value: number }>) {
  entries.forEach(e => { if (e.value > options.maxValue) throw new CurrentValueOutOfBound(e.value) })

  const normalizedEntries = entries.map(v => ({ format: v.format, value: v.value / options.maxValue }))
  const percentStr = normalizedEntries.map(p => toStringPercentage(p.value, 1)).join(' ')

  const spaceLength = 1
  return `${toBar(options.length - percentStr.length - spaceLength, options.barFormat, normalizedEntries)} ${percentStr}`
}

function toStringPercentage(value: number, fractionDigits: number) {
  return `${(value * 100).toFixed(fractionDigits)}%`
}

function toBar(length: number, format: BarFormat, entries: { format: ValueFormat, value: number }[]) {
  const bracketLength = 1
  const barInsideLength = length - bracketLength * 2
  const bar = createBarArray(entries, format, barInsideLength)
  return `[${bar.join('')}]`
}

function createBarArray(entries: { value: number, format: ValueFormat }[], { completedChar, incompleteChar }: { completedChar: string, incompleteChar: string }, length: number) {
  const sortedEntries = entries
    .map(p => ({ format: p.format, value: Math.round(p.value * (length - 1)) }))
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
      bar[i] = entry.format.valueChar
      i++
    }
  }

  while (bar.length < length) {
    bar[bar.length] = incompleteChar
  }
  return bar
}
