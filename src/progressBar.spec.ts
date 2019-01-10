import t from 'assert';
import a from 'assertron';
import { CurrentValueOutOfBound, MaxValueOutOfBound, progressBar, StringTooLong } from '.';

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
  const bar = progressBar({ valueOptions: { max: 20 } })
  const actual = bar.render(10)
  t.strictEqual(actual, '[-----------|----------] 50.0%')
  t.strictEqual(actual.length, 30)
})

test('currentValue > specified max throws CurrentValueOutOfBound', () => {
  const bar = progressBar({ valueOptions: { max: 10 } })
  a.throws(() => bar.render(12), CurrentValueOutOfBound)
})

test('max = 0 throws MaxValueOutOfBound', () => {
  a.throws(() => progressBar({ valueOptions: { max: 0 } }), MaxValueOutOfBound)
})

test('can format characters used in the bar', () => {
  const bar = progressBar({ barFormat: { completedChar: '=', incompleteChar: ' ' }, valueOptions: { char: '=' } })
  t.strictEqual(bar.render(0.5), '[============          ] 50.0%')
})

test('barFormat.incompleteChar length can only be 1', () => {
  a.throws(() => progressBar({ barFormat: { incompleteChar: 'ab' } }), StringTooLong)
})

test('valueFormat.completedChar length can only be 1', () => {
  a.throws(() => progressBar({ barFormat: { completedChar: 'ab' } }), StringTooLong)
})

test('valueFormat.valueChar length can only be 1', () => {
  a.throws(() => progressBar({ valueOptions: { char: 'ab' } }), StringTooLong)
})

test('valuePosition.left places value representation to the left of the bar', () => {
  const bar = progressBar({ valuePosition: 'left' })
  const actual = bar.render(0.5)
  t.strictEqual(actual, '50.0% [-----------|----------]')
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
