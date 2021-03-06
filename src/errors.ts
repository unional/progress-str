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
    super(`Length ${length} is too short to render ${numberOfValues} value${numberOfValues > 1 ? 's' : ''}`)
  }
}

export class MissingMaxValue extends BaseError {
  constructor() {
    super(`Value can only be 'undefined' if max is 'undefined'`)
  }
}
