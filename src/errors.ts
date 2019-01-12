import { BaseError } from 'make-error';
import { tersify } from 'tersify';

export class MaxValueOutOfBound extends BaseError {
  constructor(public value: number) {
    super(`The max value (${value}) must be greater than 0`)
  }
}

export class StringTooLong extends BaseError {
  constructor(public name: string, public value: string, public maxLength: number) {
    super(`'${name}' (${tersify(value, { maxLength: 10 })}) length is longer than expected (${maxLength})`)
  }
}
