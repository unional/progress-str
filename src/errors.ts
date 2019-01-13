import { BaseError } from 'make-error';

export class MaxValueOutOfBound extends BaseError {
  constructor(public value: number) {
    super(`The max value (${value}) must be greater than 0`)
  }
}

export class InvalidMarker extends BaseError {
  constructor(public marker: string) {
    super(`Marker must be a single character. Received '${marker}'`)
  }
}

export class LengthTooShort extends BaseError {
  constructor(public length: number, numberOfValues: number) {
    super(getlengthTooShortMessage(length, numberOfValues))
  }
}

export function getlengthTooShortMessage(length: number, numberOfValues: number) {
  return `length ${length} is too short to render ${numberOfValues} value${numberOfValues > 1 ? 's' : ''}`
}
