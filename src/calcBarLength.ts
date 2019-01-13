import stringLength from 'string-length';
import { BaseOptions } from './interfaces';
import { renderText } from './renderText';
import { ValueEntry } from './ValueEntry';

export function calcBarLength(maxLength: number, textLength: number) {
  const spaceLength = 1
  return maxLength - textLength - spaceLength
}

export function calcBarLengthForEntries(baseOption: BaseOptions, entries: ValueEntry[]) {
  const text = renderText(baseOption, entries)
  return calcBarLength(baseOption.length, stringLength(text))
}
