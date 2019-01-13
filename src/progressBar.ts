import { RecursivePartial } from 'type-plus';
import { unpartial, unpartialRecursively } from 'unpartial';
import { defaultBaseOptions, defaultValueOptions } from './defaultOptions';
import { ProgressBarOptions, ValueOptions } from './interfaces';
import { renderBar } from './renderBar';
import { validateBarFormat, validateLength, validateValueOptions } from './validate';

export function progressBar(options?: RecursivePartial<ProgressBarOptions>) {
  const { length, textPosition, textStyle, valueOptions, bar, defaultValueOptions } = extractOptions(options)

  const baseOption = { bar, length, textPosition, textStyle }

  validateLength(baseOption, [defaultValueOptions])

  return {
    render(...values: number[]) {
      const entries = values.map((value, i) => ({ value, ...(valueOptions[i] || defaultValueOptions) }))
      validateLength(baseOption, entries)
      return renderBar(baseOption, entries)
    }
  }
}

function extractOptions(options?: RecursivePartial<ProgressBarOptions>) {
  const { length, textPosition, textStyle, bar } = unpartialRecursively(defaultBaseOptions, options)
  validateBarFormat(bar)

  const valueOptions: ValueOptions[] = []

  const result = {
    bar,
    length,
    textPosition,
    textStyle,
    valueOptions,
    defaultValueOptions
  }

  if (options && options.value) {
    if (Array.isArray(options.value)) {
      valueOptions.push(...options.value.map(v => unpartial(defaultValueOptions, v)))
      valueOptions.forEach(validateValueOptions)
    }
    else {
      result.defaultValueOptions = unpartial(defaultValueOptions, options.value)
      validateValueOptions(result.defaultValueOptions)
    }
  }

  return result
}
