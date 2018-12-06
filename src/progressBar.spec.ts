import t from 'assert';
import a from 'assertron';
import { CurrentValueOutOfRange, progressBar } from '.';


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

test.skip('options.length less than X will throw LengthTooShort', () => { })

test('current value > 1 will throw CurrentValueOutOfRange', () => {
  a.throws(() => progressBar(2), CurrentValueOutOfRange)
})

test('current value === 1 is treated as 100%', () => {
  const actual = progressBar(1)
  t.strictEqual(actual, '[---------------------|] 100.0%')
})

test.skip('specify max value', () => {
  const actual = progressBar(10, 20)
  t.strictEqual(actual, '[-----------|----------] 50.0%')
})

test.skip('can spec max', () => {
  // 10 [-----|-----] 20
  // [-----|-----] 10/20
  // [-----|-----] 50%
  // [-----50%-----]
  // -----50%-----
  // 0%----------
  // ----------100%
  // [-----|-----]
  // 50% [-----|-----]
  // 10/20 [-----|-----]
  // 0-----10-----20
  // const actual = progressBar(0.2) // max 1
  // progressBar(10) // throws
  // progressBar(10, 30)
  // progressBar(10, 30, { length: 20 })
  // progressBar(10, { max: 30 })
})
