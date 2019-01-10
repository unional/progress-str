import { RecursivePartial } from 'type-plus';
import { unpartialRecursively } from 'unpartial';
import { CurrentValueOutOfBound } from './errors';
import { renderBar } from './renderBar';
import { validateBarFormat, validateValueOptions } from './validate';
import { ProgressBarOptions } from './interfaces';
import { defaultOptions } from './defaultOptions';

export function progressBar(options?: RecursivePartial<ProgressBarOptions>) {
  const { length, valueOptions, barFormat } = extractOptions(options)
  return {
    render(value: number) {
      if (value > valueOptions.max) throw new CurrentValueOutOfBound(value)
      return renderBar({ length, barFormat }, { value, ...valueOptions })
    }
  }
}

function extractOptions(options?: RecursivePartial<ProgressBarOptions>) {
  const { length, valueOptions, barFormat } = unpartialRecursively(defaultOptions, options)
  validateBarFormat(barFormat)
  validateValueOptions(valueOptions)
  return {
    length,
    barFormat,
    valueOptions
  }
}
