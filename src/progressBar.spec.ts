import t from 'assert';
import { progressBar } from '.';

test('return empty string', () => {
  const actual = progressBar()
  t.strictEqual(actual, '')
})
