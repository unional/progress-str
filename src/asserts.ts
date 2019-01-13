import t from 'assert';
import stringLength from 'string-length';

export function assertRendering(actual: string, expected: string, length = 30) {
  t.strictEqual(actual, expected)
  t.strictEqual(stringLength(actual), length)
}
