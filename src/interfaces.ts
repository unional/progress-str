export type BarOptions = {
  completedChar: string
  incompleteChar: string
}

export type ValueOptions = {
  max: number
  char: string
}

export type ProgressBarOptions = {
  length: number
  barFormat: BarOptions
  valueOptions: ValueOptions
}
