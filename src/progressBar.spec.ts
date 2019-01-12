import t from 'assert';
import a from 'assertron';
import { MaxValueOutOfBound, progressBar, StringTooLong } from '.';

describe('single value', () => {
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

  test('options.length controls the length of the overall result', () => {
    const bar = progressBar({ length: 15 })
    const actual = bar.render(0.5)
    t.strictEqual(actual.length, 15)
  })

  test.skip('options.length less than X will throw LengthTooShort', () => { })

  test('current value > 1 shows marker at 100%, but text still shows actual value', () => {
    const bar = progressBar()
    const actual = bar.render(2)
    t.strictEqual(actual, '[--------------------|] 200.0%')
    t.strictEqual(actual.length, 30)
  })

  test('current value === 1 is treated as 100%', () => {
    const bar = progressBar()
    const actual = bar.render(1)
    t.strictEqual(actual, '[--------------------|] 100.0%')
    t.strictEqual(actual.length, 30)
  })

  test('can specify max value', () => {
    const bar = progressBar({ value: { max: 20 } })
    const actual = bar.render(10)
    t.strictEqual(actual, '[-----------|----------] 50.0%')
    t.strictEqual(actual.length, 30)
  })

  test('currentValue > specified max shows marker at 100%, but text still shows actual value', () => {
    const bar = progressBar({ value: { max: 10 } })
    const actual = bar.render(12)
    t.strictEqual(actual, '[--------------------|] 120.0%')
    t.strictEqual(actual.length, 30)
  })

  test('max = 0 throws MaxValueOutOfBound', () => {
    a.throws(() => progressBar({ value: { max: 0 } }), MaxValueOutOfBound)
  })

  test('can format markers used in the bar', () => {
    const bar = progressBar({ bar: { completedMarker: '=', incompleteMarker: ' ' }, value: { marker: '=' } })
    t.strictEqual(bar.render(0.5), '[============          ] 50.0%')
  })

  test('bar.incompleteMarker length can only be 1', () => {
    a.throws(() => progressBar({ bar: { incompleteMarker: 'ab' } }), StringTooLong)
  })

  test('bar.completedMarker length can only be 1', () => {
    a.throws(() => progressBar({ bar: { completedMarker: 'ab' } }), StringTooLong)
  })

  test('value.marker length can only be 1', () => {
    a.throws(() => progressBar({ value: { marker: 'ab' } }), StringTooLong)
  })

  test('textPosition.left places value representation to the left of the bar', () => {
    const bar = progressBar({ textPosition: 'left' })
    const actual = bar.render(0.5)
    t.strictEqual(actual, '50.0% [-----------|----------]')
  })

  test('textStyle can be number', () => {
    const bar = progressBar({ textStyle: 'number' })
    const actual = bar.render(0.5)
    t.strictEqual(actual, '[------------|-----------] 0.5')
    t.strictEqual(actual.length, 30)
  })

  test('textStyle can be ratio', () => {
    const bar = progressBar({ textStyle: 'ratio' })
    const actual = bar.render(0.5)
    t.strictEqual(actual, '[-----------|----------] 0.5/1')
    t.strictEqual(actual.length, 30)
  })

  test('value.digits controls how many fractional digits in percentage', () => {
    const bar = progressBar({ value: { digits: 0 } })
    const actual = bar.render(0.5)
    t.strictEqual(actual, '[------------|-----------] 50%')
    t.strictEqual(actual.length, 30)

    const bar2 = progressBar({ value: { digits: 2 } })
    const actual2 = bar2.render(0.5)
    t.strictEqual(actual2, '[----------|----------] 50.00%')
    t.strictEqual(actual2.length, 30)
  })

  test('value.digits controls how many fractional digits in number', () => {
    const bar = progressBar({ textStyle: 'number', value: { digits: 2 } })
    const actual = bar.render(0.5123)
    t.strictEqual(actual, '[-----------|-----------] 0.51')
    t.strictEqual(actual.length, 30)
  })

  test('value.digits controls how many fractional digits in ratio', () => {
    const bar = progressBar({ textStyle: 'ratio', value: { max: 50, digits: 0 } })
    const actual = bar.render(25.1)
    t.strictEqual(actual, '[-----------|----------] 25/50')
    t.strictEqual(actual.length, 30)
  })
})

describe('two values', () => {
  test('maxValue = 0 throws MaxValueOutOfBound', () => {
    a.throws(() => progressBar({ value: { max: 0 } }), MaxValueOutOfBound)
  })

  test('two values', () => {
    const bar = progressBar()
    t.strictEqual(bar.render(0.5, 1), '[-------|------|] 50.0% 100.0%')
    t.strictEqual(bar.render(1, 0.5), '[-------|------|] 100.0% 50.0%')
  })

  test('two same values', () => {
    const bar = progressBar()
    const actual = bar.render(0.5, 0.5)
    t.strictEqual(actual, '[--------|-------] 50.0% 50.0%')
  })

  test('first value > specified max shows marker at 100%, but text still shows actual value', () => {
    const bar = progressBar({ value: { max: 10 } })
    t.strictEqual(bar.render(12, 0.5), '[-------|------|] 120.0% 50.0%')
  })

  test('second value > specified max shows marker at 100%, but text still shows actual value', () => {
    const bar = progressBar({ value: { max: 10 } })
    t.strictEqual(bar.render(5, 1.2), '[-------|------|] 50.0% 120.0%')
  })
  test('can format markers used in the bar', () => {
    const bar = progressBar({ bar: { completedMarker: '=', incompleteMarker: ' ' }, value: { marker: '=' } })
    t.strictEqual(bar.render(0.5, 0.5), '[=========       ] 50.0% 50.0%')
  })

  test('format each value with different marker', () => {
    const bar = progressBar({ values: [{ marker: '|' }, { marker: '*' }] })
    t.strictEqual(bar.render(0.5, 1), '[-------|------*] 50.0% 100.0%')
  })

  test('bar.incompleteMarker length can only be 1', () => {
    a.throws(() => progressBar({ bar: { incompleteMarker: 'ab' } }), StringTooLong)
  })

  test('bar.completedMarker length can only be 1', () => {
    a.throws(() => progressBar({ bar: { completedMarker: 'ab' } }), StringTooLong)
  })

  test('value.marker length can only be 1', () => {
    a.throws(() => progressBar({ value: { marker: 'ab' } }), StringTooLong)
  })

  test('textPosition.left places value representation to the left of the bar', () => {
    const bar = progressBar({ textPosition: 'left' })
    const actual = bar.render(0.5, 1)
    t.strictEqual(actual, '50.0% 100.0% [-------|------|]')
  })
})
