import { ProgressBarOptions } from './interfaces';

export const defaultOptions: ProgressBarOptions = {
  length: 30,
  barFormat: {
    completedChar: '-',
    incompleteChar: '-'
  },
  valueOptions: {
    max: 1,
    char: '|'
  }
}
