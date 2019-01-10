import { RecursivePartial } from 'type-plus';
import { unpartialRecursively } from 'unpartial';
import { barFormat, length, valueOptions } from './defaultOptions';
import { CurrentValueOutOfBound } from './errors';
import { ValueOptions } from './interfaces';
import { renderBar, RenderBarOptions } from './renderBar';
import { validateBarFormat, validateValueOptions } from './validate';

export type ProgressBarOptions = RenderBarOptions & {
  valueOptions: ValueOptions
}

const defaultOptions: ProgressBarOptions = {
  length,
  barFormat,
  valueOptions
}

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
