import { calcBarLength } from './calcBarLength';
import { InvalidMarker, LengthTooShort, MaxValueOutOfBound } from './errors';
import { BarFormat, BaseOptions, ValueOptions } from './interfaces';
import { renderText } from './renderText';

export function validateValueOptions(options: Partial<ValueOptions>) {
  if (options.max !== undefined && (options.max <= 0)) throw new MaxValueOutOfBound(options.max)
  if (options.marker !== undefined && options.marker.length !== 1) throw new InvalidMarker(options.marker)
}

export function validateBarFormat(format: Partial<BarFormat>) {
  if (format.incompleteMarker !== undefined && format.incompleteMarker.length !== 1) throw new InvalidMarker(format.incompleteMarker)
  if (format.completedMarker !== undefined && format.completedMarker.length !== 1) throw new InvalidMarker(format.completedMarker)
}

export function validateLength(baseOption: BaseOptions, valueOptions: ValueOptions[]) {
  const entries = valueOptions.map(o => ({ value: o.max, ...o }))
  const text = renderText(baseOption, entries)
  const len = calcBarLength(baseOption.length, text.length)
  if (len < 5) throw new LengthTooShort(baseOption.length, entries.length)
}
