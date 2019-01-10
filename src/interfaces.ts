export type BarFormat = {
  completedChar: string
  incompleteChar: string
}

export type ValueOptions = {
  max: number
  char: string
}

export type ProgressBarOptions = {
  length: number
  barFormat: BarFormat
  valueOptions: ValueOptions
}
