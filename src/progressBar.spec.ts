import t from 'assert';
import a from 'assertron';
import { CurrentValueOutOfBound, progressBar, MaxValueOutOfBound, twoValuesProgressBar } from '.';
import { StringTooLong } from './errors';

describe('progressBar()', () => {
  test('prints 0.5 as 50.0%', () => {
    const bar = progressBar()
    const actual = bar.render(0.5)
    t.strictEqual(actual, '[-----------|----------] 50.0%')
  })

  test('prints 0 as 0.0%', () => {
    const bar = progressBar()
    const actual = bar.render(0)
    t.strictEqual(actual, '[|----------------------] 0.0%')
  })

  test('options can be empty', () => {
    progressBar({})
  })

  test('default length is 30', () => {
    const bar = progressBar()
    const actual = bar.render(0.5)
    t.strictEqual(actual.length, 30)
  })

  test('options.length control the length of the overall result', () => {
    const bar = progressBar({ length: 15 })
    const actual = bar.render(0.5)
    t.strictEqual(actual.length, 15)
  })

  test.skip('options.length less than X will throw LengthTooShort', () => { })

  test('current value > 1 will throw CurrentValueOutOfBound', () => {
    const bar = progressBar()
    a.throws(() => bar.render(2), CurrentValueOutOfBound)
  })

  test('current value === 1 is treated as 100%', () => {
    const bar = progressBar()
    const actual = bar.render(1)
    t.strictEqual(actual, '[--------------------|] 100.0%')
    t.strictEqual(actual.length, 30)
  })

  test('can specify max value', () => {
    const bar = progressBar({ maxValue: 20 })
    const actual = bar.render(10)
    t.strictEqual(actual, '[-----------|----------] 50.0%')
    t.strictEqual(actual.length, 30)
  })

  test('currentValue > specified maxValue throws CurrentValueOutOfBound', () => {
    const bar = progressBar({ maxValue: 10 })
    a.throws(() => bar.render(12), CurrentValueOutOfBound)
  })

  test('maxValue = 0 throws MaxValueOutOfBound', () => {
    a.throws(() => progressBar({ maxValue: 0 }), MaxValueOutOfBound)
  })

  test('can format characters used in the bar', () => {
    const bar = progressBar({ barFormat: { completedChar: '=', incompleteChar: ' ' }, valueFormat: { valueChar: '=' } })
    t.strictEqual(bar.render(0.5), '[============          ] 50.0%')
  })

  test('barFormat.incompleteChar length can only be 1', () => {
    a.throws(() => progressBar({ barFormat: { incompleteChar: 'ab' } }), StringTooLong)
  })

  test('valueFormat.completedChar length can only be 1', () => {
    a.throws(() => progressBar({ barFormat: { completedChar: 'ab' } }), StringTooLong)
  })

  test('valueFormat.valueChar length can only be 1', () => {
    a.throws(() => progressBar({ valueFormat: { valueChar: 'ab' } }), StringTooLong)
  })
})

describe('twoValueProgressBar()', () => {
  test('maxValue = 0 throws MaxValueOutOfBound', () => {
    a.throws(() => twoValuesProgressBar({ maxValue: 0 }), MaxValueOutOfBound)
  })

  test('two values', () => {
    const bar = twoValuesProgressBar()
    t.strictEqual(bar.render(0.5, 1), '[-------|------|] 50.0% 100.0%')
    t.strictEqual(bar.render(1, 0.5), '[-------|------|] 100.0% 50.0%')
  })

  test('two same values', () => {
    const bar = twoValuesProgressBar()
    const actual = bar.render(0.5, 0.5)
    t.strictEqual(actual, '[--------|-------] 50.0% 50.0%')
  })

  test('first value > specified maxValue throws CurrentValueOutOfBound', () => {
    const bar = twoValuesProgressBar({ maxValue: 10 })
    a.throws(() => bar.render(12, 1), CurrentValueOutOfBound)
  })

  test('second value > specified maxValue throws CurrentValueOutOfBound', () => {
    const bar = twoValuesProgressBar({ maxValue: 10 })
    a.throws(() => bar.render(1, 12), CurrentValueOutOfBound)
  })
  test('can format characters used in the bar', () => {
    const bar = twoValuesProgressBar({ barFormat: { completedChar: '=', incompleteChar: ' ' }, valueFormat: { valueChar: '=' } })
    t.strictEqual(bar.render(0.5, 0.5), '[=========       ] 50.0% 50.0%')
  })

  test('format each value with different character', () => {
    const bar = twoValuesProgressBar({ valueFormat: [{ valueChar: '|' }, { valueChar: '*' }] })
    t.strictEqual(bar.render(0.5, 1), '[-------|------*] 50.0% 100.0%')
  })

  test('barFormat.incompleteChar length can only be 1', () => {
    a.throws(() => twoValuesProgressBar({ barFormat: { incompleteChar: 'ab' } }), StringTooLong)
  })

  test('valueFormat.completedChar length can only be 1', () => {
    a.throws(() => twoValuesProgressBar({ barFormat: { completedChar: 'ab' } }), StringTooLong)
  })

  test('valueFormat.valueChar length can only be 1', () => {
    a.throws(() => twoValuesProgressBar({ valueFormat: { valueChar: 'ab' } }), StringTooLong)
  })
})

test.skip('formats', () => {
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
