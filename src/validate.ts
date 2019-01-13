import stringLength from 'string-length';
import { calcBarLengthForEntries } from './calcBarLength';
import { InvalidMarker, LengthTooShort, MaxValueOutOfBound } from './errors';
import { BarFormat, BaseOptions, ValueOptions } from './interfaces';
import { ValueEntry } from './ValueEntry';

export function validateValueOptions(options: Partial<ValueOptions>) {
  if (options.max !== undefined && (options.max <= 0)) throw new MaxValueOutOfBound(options.max)
  if (options.marker !== undefined && stringLength(options.marker) !== 1) throw new InvalidMarker(options.marker)
}

export function validateBarFormat(format: Partial<BarFormat>) {
  if (format.incompleteMarker !== undefined && stringLength(format.incompleteMarker) !== 1) throw new InvalidMarker(format.incompleteMarker)
  if (format.completedMarker !== undefined && stringLength(format.completedMarker) !== 1) throw new InvalidMarker(format.completedMarker)
}

export function validateLength(baseOption: BaseOptions, entries: ValueEntry[]) {
  const len = calcBarLengthForEntries(baseOption, entries)
  if (len < 3 + stringLength(baseOption.bar.leftBracketMarker) + stringLength(baseOption.bar.rightBracketMarker))
    throw new LengthTooShort(baseOption.length, entries.length)
}
