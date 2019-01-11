import { MaxValueOutOfBound, StringTooLong } from './errors';
import { BarFormat, ValueOptions } from './interfaces';

export function validateValueOptions(options: Partial<ValueOptions>) {
  if (options.max !== undefined && (options.max <= 0)) throw new MaxValueOutOfBound(options.max)
  if (options.marker && options.marker.length > 1) throw new StringTooLong('value.char', options.marker, 1)
}

export function validateBarFormat(format: Partial<BarFormat>) {
  if (format.incompleteMarker && format.incompleteMarker.length > 1) throw new StringTooLong('incompleteChar', format.incompleteMarker, 1)
  if (format.completedMarker && format.completedMarker.length > 1) throw new StringTooLong('completedChar', format.completedMarker, 1)
}
