import stringLength from 'string-length'
import type { BaseOptions } from './interfaces.js'
import { renderText } from './renderText.js'
import type { ValueEntry } from './ValueEntry.js'

export function calcBarLength(maxLength: number, textLength: number) {
	const spaceLength = 1
	return maxLength - textLength - spaceLength
}

export function calcBarLengthForEntries(baseOption: BaseOptions, entries: ValueEntry[]) {
	if (baseOption.textPosition === 'none') return baseOption.length

	const text = renderText(baseOption, entries)
	return calcBarLength(baseOption.length, stringLength(text))
}
