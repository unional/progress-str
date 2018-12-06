import { BaseError } from 'make-error'

export class CurrentValueOutOfRange extends BaseError {
  constructor(public value: number) {
    super(`The current value (${value}) must be between 0 and 1`)
  }
}
