import { unpartial } from 'unpartial';
import { CurrentValueOutOfRange } from './errors';

export interface Options {
  length: number
  maxValue: number
}

export class ProgressBar {
  length: number
  maxValue: number
  constructor(options?: Partial<Options>) {
    const { length, maxValue } = unpartial({ length: 30, maxValue: 1 }, options)
    this.length = length
    this.maxValue = maxValue
  }
  render(value: number) {
    return progressBarPercent(value, this)
  }
}

function progressBarPercent(currentValue: number, options: Options) {
  if (currentValue > 1) throw new CurrentValueOutOfRange(currentValue)

  const percent = toPercentage(currentValue, 1)
  const spaceLength = 1
  return `${toBar(currentValue, options.length - percent.length - spaceLength)} ${percent}`
}

function toBar(percent: number, length: number) {
  const bracketLength = 1
  const barInsideLength = length - bracketLength * 2
  const location = Math.round(percent * barInsideLength)
  const bar = new Array(barInsideLength).fill('-')
  bar[location] = '|'
  return `[${bar.join('')}]`
}

function toPercentage(value: number, fractionDigits: number) {
  return `${(value * 100).toFixed(fractionDigits)}%`
}
