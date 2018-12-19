import { BaseError } from 'make-error'

export class CurrentValueOutOfBound extends BaseError {
  constructor(public value: number) {
    super(`The current value (${value}) must be between 0 and 1`)
  }
}

export class MaxValueOutOfBound extends BaseError {
  constructor(public value: number) {
    super(`The max value (${value}) must be greater than 0`)
  }
}
