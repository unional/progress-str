import { CurrentValueOutOfRange } from './errors';

export interface Options {
  length: number
}

export function progressBar(currentValue: number, options?: Options)
export function progressBar(currentValue: number, maxValue: number, options?: Options)
export function progressBar(currentValue: number, maxOrOption?: any, options?: any) {
  if (options) {
    return progressBarWithMax(currentValue, maxOrOption, options)
  }

  return progressBarPercent(currentValue, maxOrOption)
}

function progressBarWithMax(currentValue: number, maxValue: number, options: Options) {

}

function progressBarPercent(currentValue: number, options: Options = { length: 30 }) {
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
