import { BaseOptions, ValueOptions } from './interfaces';

export const defaultBaseOptions: BaseOptions = {
  bar: {
    completedMarker: '-',
    incompleteMarker: '-'
  },
  length: 30,
  textPosition: 'right',
  textStyle: 'percentage'
}

export const defaultValueOptions: ValueOptions = {
  max: 1,
  marker: '|'
}
