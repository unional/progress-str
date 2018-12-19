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
      return progressBarPercent(value, actualOptions)
    }
  }
}

function progressBarPercent(currentValue: number, options: Options) {
  if (currentValue > options.maxValue) throw new CurrentValueOutOfBound(currentValue)

  const percentage = currentValue / options.maxValue
  const percentStr = toStringPercentage(percentage, 1)
  const spaceLength = 1
  return `${toBar(percentage, options.length - percentStr.length - spaceLength)} ${percentStr}`
}

function toBar(percent: number, length: number) {
  const bracketLength = 1
  const barInsideLength = length - bracketLength * 2
  const location = Math.round(percent * barInsideLength)
  const bar = new Array(barInsideLength).fill('-')
  bar[location] = '|'
  return `[${bar.join('')}]`
}

function toStringPercentage(value: number, fractionDigits: number) {
  return `${(value * 100).toFixed(fractionDigits)}%`
}
