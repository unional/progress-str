import t from 'assert';
import { progressBar } from '.';


test('prints 0.5 as 50.0%', () => {
  const actual = progressBar(0.5)
  t.strictEqual(actual, '[-----------|----------] 50.0%')
})

test('prints 0 as 0.0%', () => {
  const actual = progressBar(0)
  t.strictEqual(actual, '[|----------------------] 0.0%')
})

test('default length is 30', () => {
  const actual = progressBar(0.5)
  t.strictEqual(actual.length, 30)
})

test('options.length control the length of the overall result', () => {
  const actual = progressBar(0.5, { length: 15 })
  t.strictEqual(actual.length, 15)
})
