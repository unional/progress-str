export type BarFormat = {
  completedMarker: string
  incompleteMarker: string
}

export type ValueOptions = {
  max: number
  marker: string
}

export type BaseOptions = {
  length: number
  valuePosition: 'left' | 'right'
  barFormat: BarFormat
}

export type ProgressBarOptions = BaseOptions & {
  valueOptions: ValueOptions
}
