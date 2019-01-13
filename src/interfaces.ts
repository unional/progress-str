export type BarFormat = {
  leftBracketMarker: string,
  rightBracketMarker: string,
  completedMarker: string
  incompleteMarker: string
}

export type ValueOptions = {
  max: number
  marker: string,
  digits?: 0 | 1 | 2
}

export type BaseOptions = {
  bar: BarFormat
  length: number
  textPosition: 'left' | 'right'
  textStyle: 'percentage' | 'number' | 'ratio'
  textTransform?: (text: string) => string
}

export type ProgressBarOptions = BaseOptions & {
  value: ValueOptions | ValueOptions[]
}
