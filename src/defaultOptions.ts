import { BaseOptions, ValueOptions } from './interfaces';

export const defaultBaseOptions: BaseOptions = {
  bar: {
    leftBracketMarker: '[',
    rightBracketMarker: ']',
    completedMarker: '-',
    incompleteMarker: '-'
  },
  length: 30,
  textAlign: 'left',
  textPosition: 'right'
}

export const defaultValueOptions: ValueOptions = {
  max: 1,
  marker: '|',
  textStyle: 'percentage'
}
