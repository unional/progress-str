import { MaxValueOutOfBound, StringTooLong } from './errors';
import { BarFormat, ValueOptions } from './interfaces';

export function validateValueOptions(options: Partial<ValueOptions>) {
  if (options.max !== undefined && (options.max <= 0)) throw new MaxValueOutOfBound(options.max)
  if (options.char && options.char.length > 1) throw new StringTooLong('value.char', options.char, 1)
}

export function validateBarFormat(format: Partial<BarFormat>) {
  if (format.incompleteChar && format.incompleteChar.length > 1) throw new StringTooLong('incompleteChar', format.incompleteChar, 1)
  if (format.completedChar && format.completedChar.length > 1) throw new StringTooLong('completedChar', format.completedChar, 1)
}
