import { RecursivePartial } from 'type-plus';
import { unpartial, unpartialRecursively } from 'unpartial';
import { defaultBaseOptions, defaultValueOptions } from './defaultOptions';
import { MultiValuesProgressBarOptions, ProgressBarOptions, ValueOptions } from './interfaces';
import { renderBar } from './renderBar';
import { validateBarFormat, validateValueOptions } from './validate';

export function progressBar(options?: RecursivePartial<ProgressBarOptions> | RecursivePartial<MultiValuesProgressBarOptions>) {
  const { length, textPosition, textStyle, valueOptions, bar } = extractOptions(options)
  return {
    render(...values: number[]) {
      const entries = values.map((value, i) => ({ value, ...(valueOptions[i] || defaultValueOptions) }))

      return renderBar({ bar, length, textPosition, textStyle }, ...entries)
    }
  }
}

function extractOptions(options?: RecursivePartial<ProgressBarOptions> | RecursivePartial<MultiValuesProgressBarOptions>) {
  const { length, textPosition, textStyle, bar } = unpartialRecursively(defaultBaseOptions, options)
  validateBarFormat(bar)

  const valueOptions: ValueOptions[] = []
  if (options) {
    if (isSingleValueOptions(options)) {
      const o = unpartial(defaultValueOptions, options.value)
      validateValueOptions(o)
      valueOptions.push(o)
    }
    else if (isMultiValueOptions(options)) {
      valueOptions.push(...options.values.map(v => unpartial(defaultValueOptions, v)))
      valueOptions.forEach(validateValueOptions)
    }
  }

  return {
    bar,
    length,
    textPosition,
    textStyle,
    valueOptions
  }
}

function isSingleValueOptions(options: any): options is ProgressBarOptions {
  return options.value
}

function isMultiValueOptions(options: any): options is MultiValuesProgressBarOptions {
  return options.values
}
