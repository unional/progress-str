export type BarFormat = {
  leftBracketMarker: string,
  rightBracketMarker: string,
  completedMarker: string
  incompleteMarker: string
}

export type ValueOptions = {
  digits?: 0 | 1 | 2
  max: number
  marker: string
  textStyle: 'percentage' | 'number' | 'ratio'
  textTransform?: (text: string) => string
}

export type BaseOptions = {
  bar: BarFormat
  length: number
  /**
   * Position of the text relative to the bar.
   */
  textPosition: 'left' | 'right' | 'none'
  /**
   * Alignment of the text. left: '10__', right: '__10'
   */
  textAlign: 'left' | 'right'
}

export type ProgressBarOptions = BaseOptions & {
  value: ValueOptions | ValueOptions[]
}

export type ProgressBar = {
  render(...values: (number | undefined)[]): string
}
