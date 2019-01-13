import { RecursivePartial } from 'type-plus';
import { unpartial, unpartialRecursively } from 'unpartial';
import { defaultBaseOptions, defaultValueOptions } from './defaultOptions';
import { ProgressBarOptions, ValueOptions, ProgressBar } from './interfaces';
import { renderBar } from './renderBar';
import { validateBarFormat, validateLength, validateValueOptions } from './validate';

export function progressBar(options?: RecursivePartial<ProgressBarOptions>): ProgressBar {
  const { length, textPosition, valueOptions, bar, defaultValueOptions } = extractOptions(options)

  const baseOption = { bar, length, textPosition }

  validateLength(baseOption, [{ value: defaultValueOptions.max, ...defaultValueOptions }])

  return {
    render(...values: number[]) {
      const entries = values.map((value, i) => ({ value, ...(valueOptions[i] || defaultValueOptions) }))
      try {
        validateLength(baseOption, entries)
      }
      catch (e) {
        return e.message
      }
      return renderBar(baseOption, entries)
    }
  }
}

function extractOptions(options?: RecursivePartial<ProgressBarOptions>) {
  const { bar, length, textPosition } = unpartialRecursively(defaultBaseOptions, options)
  validateBarFormat(bar)

  const valueOptions: ValueOptions[] = []

  const result = {
    bar,
    length,
    // textAlign,
    textPosition,
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
