import t from 'assert';
import a from 'assertron';
import { CurrentValueOutOfBound, MaxValueOutOfBound, twoValuesProgressBar } from '.';
import { StringTooLong } from './errors';

test('maxValue = 0 throws MaxValueOutOfBound', () => {
  a.throws(() => twoValuesProgressBar({ valueOptions: { max: 0 } }), MaxValueOutOfBound)
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
  const bar = twoValuesProgressBar({ valueOptions: { max: 10 } })
  a.throws(() => bar.render(12, 1), CurrentValueOutOfBound)
})

test('second value > specified maxValue throws CurrentValueOutOfBound', () => {
  const bar = twoValuesProgressBar({ valueOptions: { max: 10 } })
  a.throws(() => bar.render(1, 12), CurrentValueOutOfBound)
})
test('can format characters used in the bar', () => {
  const bar = twoValuesProgressBar({ barFormat: { completedChar: '=', incompleteChar: ' ' }, valueOptions: { char: '=' } })
  t.strictEqual(bar.render(0.5, 0.5), '[=========       ] 50.0% 50.0%')
})

test('format each value with different character', () => {
  const bar = twoValuesProgressBar({ valueOptions: [{ char: '|' }, { char: '*' }] })
  t.strictEqual(bar.render(0.5, 1), '[-------|------*] 50.0% 100.0%')
})

test('barFormat.incompleteChar length can only be 1', () => {
  a.throws(() => twoValuesProgressBar({ barFormat: { incompleteChar: 'ab' } }), StringTooLong)
})

test('valueFormat.completedChar length can only be 1', () => {
  a.throws(() => twoValuesProgressBar({ barFormat: { completedChar: 'ab' } }), StringTooLong)
})

test('valueFormat.valueChar length can only be 1', () => {
  a.throws(() => twoValuesProgressBar({ valueOptions: { char: 'ab' } }), StringTooLong)
})

test('valuePosition.left places value representation to the left of the bar', () => {
  const bar = twoValuesProgressBar({ valuePosition: 'left' })
  const actual = bar.render(0.5, 1)
  t.strictEqual(actual, '50.0% 100.0% [-------|------|]')
})
