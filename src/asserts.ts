import t from 'assert';

export function assertRendering(actual: string, expected: string, length = 30) {
  t.strictEqual(actual, expected)
  t.strictEqual(actual.length, length)
}
