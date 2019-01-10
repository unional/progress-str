import { RecursivePartial } from 'type-plus';
import { unpartial, unpartialRecursively } from 'unpartial';
import { CurrentValueOutOfBound } from './errors';
import { BarOptions, ValueOptions } from './interfaces';
import { renderBar } from './renderBar';
import { validateBarFormat, validateValueOptions } from './validate';
import { defaultOptions } from './defaultOptions';

export type TwoValuesProgressBarOptions = {
  length: number
  barFormat: BarOptions
  valueOptions: ValueOptions | [ValueOptions, ValueOptions]
}

export function twoValuesProgressBar(options?: RecursivePartial<TwoValuesProgressBarOptions>) {
  const { length, valueOptions, barFormat } = extractTwoValuesOptions(options)
  return {
    render(value1: number, value2: number) {
      if (value1 > valueOptions[0].max) throw new CurrentValueOutOfBound(value1)
      if (value2 > valueOptions[1].max) throw new CurrentValueOutOfBound(value2)
      return renderBar(
        { length, barFormat },
        { value: value1, ...valueOptions[0] },
        { value: value2, ...valueOptions[1] })
    }
  }
}

function extractTwoValuesOptions(options?: RecursivePartial<TwoValuesProgressBarOptions>) {
  const { length, valueOptions, barFormat } = unpartialRecursively(defaultOptions, options)
  validateBarFormat(barFormat)
  const valueOptionsArray = Array.isArray(valueOptions) ? [
    unpartial(defaultOptions.valueOptions, valueOptions[0]),
    unpartial(defaultOptions.valueOptions, valueOptions[1])
  ] : [valueOptions, valueOptions]
  validateValueOptions(valueOptionsArray[0])
  validateValueOptions(valueOptionsArray[1])
  return {
    length,
    barFormat,
    valueOptions: valueOptionsArray
  }
}
