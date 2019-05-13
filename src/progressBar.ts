import { RecursivePartial, required, requiredDeep } from 'type-plus';
import { defaultBaseOptions, defaultValueOptions } from './defaultOptions';
import { ProgressBar, ProgressBarOptions, ValueOptions } from './interfaces';
import { renderBar } from './renderBar';
import { validateBarFormat, validateLength, validateValueOptions } from './validate';
import { createValueEntry } from './ValueEntry';

export function progressBar(options?: RecursivePartial<ProgressBarOptions>): ProgressBar {
  const { bar, length, textAlign, textPosition, valueOptions, defaultValueOptions } = extractOptions(options)

  const baseOption = { bar, length, textAlign, textPosition }

  validateLength(baseOption, [createValueEntry(defaultValueOptions, defaultValueOptions.max)])

  return {
    render(...values: number[]) {
      const entries = values.map((value, i) => createValueEntry(valueOptions[i] || defaultValueOptions, value))
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
  const { bar, length, textAlign, textPosition } = requiredDeep(defaultBaseOptions, options)
  validateBarFormat(bar)

  const valueOptions: ValueOptions[] = []

  const result = {
    bar,
    length,
    textAlign,
    textPosition,
    valueOptions,
    defaultValueOptions
  }

  if (options && options.value) {
    if (Array.isArray(options.value)) {
      valueOptions.push(...options.value.map(v => required(defaultValueOptions, v)))
      valueOptions.forEach(validateValueOptions)
    }
    else {
      result.defaultValueOptions = required(defaultValueOptions, options.value)
      validateValueOptions(result.defaultValueOptions)
    }
  }

  return result
}
