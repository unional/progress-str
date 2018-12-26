import { unpartial } from 'unpartial';
import { CurrentValueOutOfBound, MaxValueOutOfBound } from './errors';

export interface Options {
  length: number
  maxValue: number
}

export function progressBar(options?: Partial<Options>) {
  const actualOptions = unpartial({ length: 30, maxValue: 1 }, options)
  if (actualOptions.maxValue <= 0) throw new MaxValueOutOfBound(actualOptions.maxValue)
  return {
    render(value: number) {
      return progressBarPercent(actualOptions, value)
    }
  }
}

export function twoValuesProgressBar(options?: Partial<Options>) {
  const actualOptions = unpartial({ length: 30, maxValue: 1 }, options)
  if (actualOptions.maxValue <= 0) throw new MaxValueOutOfBound(actualOptions.maxValue)
  return {
    render(value1: number, value2: number) {
      return progressBarPercent(actualOptions, value1, value2)
    }
  }
}


function progressBarPercent(options: Options, ...values: number[]) {
  values.forEach(v => { if (v > options.maxValue) throw new CurrentValueOutOfBound(v) })

  const percentages = values.map(v => v / options.maxValue)
  const percentStr = percentages.map(p => toStringPercentage(p, 1)).join(' ')

  const spaceLength = 1
  return `${toBar(percentages, options.length - percentStr.length - spaceLength)} ${percentStr}`
}

function toBar(percentages: number[], length: number) {
  const bracketLength = 1
  const barInsideLength = length - bracketLength * 2
  const locations = percentages.map(p => Math.round(p * barInsideLength))
  const bar = new Array(barInsideLength).fill('-')
  locations.forEach(l => bar[l] = '|')
  return `[${bar.join('')}]`
}

function toStringPercentage(value: number, fractionDigits: number) {
  return `${(value * 100).toFixed(fractionDigits)}%`
}
