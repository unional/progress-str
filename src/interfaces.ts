export type BarFormat = {
  completedChar: string
  incompleteChar: string
}

export type ValueOptions = {
  max: number
  char: string
}

export type BaseOptions = {
  length: number
  valuePosition: 'left' | 'right'
  barFormat: BarFormat
}

export type ProgressBarOptions = BaseOptions & {
  valueOptions: ValueOptions
}
