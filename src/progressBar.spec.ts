import t from 'assert';
import a from 'assertron';
import { CurrentValueOutOfRange, ProgressBar } from '.';


test('prints 0.5 as 50.0%', () => {
  const bar = new ProgressBar()
  const actual = bar.render(0.5)
  t.strictEqual(actual, '[-----------|----------] 50.0%')
})

test('prints 0 as 0.0%', () => {
  const bar = new ProgressBar()
  const actual = bar.render(0)
  t.strictEqual(actual, '[|----------------------] 0.0%')
})

test('options can be empty', () => {
  // tslint:disable-next-line
  new ProgressBar({})
})

test('default length is 30', () => {
  const bar = new ProgressBar()
  const actual = bar.render(0.5)
  t.strictEqual(actual.length, 30)
})

test('options.length control the length of the overall result', () => {
  const bar = new ProgressBar({ length: 15 })
  const actual = bar.render(0.5)
  t.strictEqual(actual.length, 15)
})

test.skip('options.length less than X will throw LengthTooShort', () => { })

test('current value > 1 will throw CurrentValueOutOfRange', () => {
  const bar = new ProgressBar()
  a.throws(() => bar.render(2), CurrentValueOutOfRange)
})

test('current value === 1 is treated as 100%', () => {
  const bar = new ProgressBar()
  const actual = bar.render(1)
  t.strictEqual(actual, '[---------------------|] 100.0%')
})

test.skip('specify max value', () => {
  const bar = new ProgressBar({ maxValue: 20 })
  const actual = bar.render(10)
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
