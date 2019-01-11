import { ProgressBarOptions } from './interfaces';

export const defaultOptions: ProgressBarOptions = {
  length: 30,
  valuePosition: 'right',
  barFormat: {
    completedMarker: '-',
    incompleteMarker: '-'
  },
  valueOptions: {
    max: 1,
    marker: '|'
  }
}
