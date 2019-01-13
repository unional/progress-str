import t from 'assert';
import a from 'assertron';
import { MaxValueOutOfBound, progressBar, InvalidMarker } from '.';
import { assertRendering } from './asserts';
import { LengthTooShort } from './errors';

test('can create progress bar without options', () => {
  progressBar()
})

test('can render one or more values', () => {
  const bar = progressBar()
  assertRendering(bar.render(0.5), '[------------|-----------] 50%')
  assertRendering(bar.render(0.25, 0.5), '[-----|----|---------] 25% 50%')
  assertRendering(bar.render(0.25, 0.5, 1), '[----|--|------|] 25% 50% 100%')
  assertRendering(bar.render(0.5, 0.25), '[-----|----|---------] 50% 25%')
})

test('text style defaults to percentage', () => {
  const bar = progressBar()
  const actual = bar.render(0.5)
  assertRendering(actual, '[------------|-----------] 50%')
})

test('text style can be number', () => {
  const bar = progressBar({ textStyle: 'number' })
  const actual = bar.render(0.5)
  assertRendering(actual, '[------------|-----------] 0.5')
})

test('text style can be ratio', () => {
  const bar = progressBar({ textStyle: 'ratio' })
  const actual = bar.render(0.5)
  assertRendering(actual, '[-----------|----------] 0.5/1')
})

test('percentage by default rounds to the whole number', () => {
  const bar = progressBar()
  const actual = bar.render(0.5)
  assertRendering(actual, '[------------|-----------] 50%')
})

test('for number style, when max is less than or equal to 1, value is rounded to 1/10 of the max value', () => {
  assertRendering(progressBar({ textStyle: 'number' }).render(0.512), '[------------|-----------] 0.5')
  assertRendering(progressBar({ textStyle: 'number', value: { max: 0.54 } }).render(0.2234), '[---------|------------] 0.223')
})

test('for number style, when max is greater than 1, value is rounded to the whole number', () => {
  assertRendering(progressBar({ textStyle: 'number', value: { max: 100 } }).render(51.2), '[------------|------------] 51')
})

test('for ratio style, when max is less than or equal to 1, value is rounded to 1/10 of the max value', () => {
  assertRendering(progressBar({ textStyle: 'ratio' }).render(0.512), '[-----------|----------] 0.5/1')
  assertRendering(progressBar({ textStyle: 'ratio', value: { max: 0.54 } }).render(0.2234), '[-------|---------] 0.223/0.54')
})

test('for ratio style, when max is greater than 1, value is rounded to the whole number', () => {
  assertRendering(progressBar({ textStyle: 'ratio', value: { max: 100 } }).render(51.2), '[----------|----------] 51/100')
})
test('digits of the text can be customized', () => {
  assertRendering(progressBar({ value: { digits: 1 } }).render(0.5), '[-----------|----------] 50.0%')

  assertRendering(
    progressBar({ value: { digits: 2 } }).render(0.515),
    '[----------|----------] 51.50%')
  assertRendering(
    progressBar({ value: { digits: 2 }, textStyle: 'number' }).render(0.515),
    '[-----------|-----------] 0.52')
  assertRendering(
    progressBar({ value: { digits: 2 }, textStyle: 'ratio' }).render(0.515),
    '[----------|----------] 0.52/1')
})

test('text can be positioned to the left', () => {
  const bar = progressBar({ textPosition: 'left' })
  assertRendering(bar.render(0.5), '50% [------------|-----------]')
  assertRendering(bar.render(0.5, 1), '50% 100% [---------|--------|]')
})

test(`incomplete marker, value marker, and completed marker are defaults to '-' '|' '-'`, () => {
  const bar = progressBar()
  const actual = bar.render(0.5)
  assertRendering(actual, '[------------|-----------] 50%')
})

test(`incomplete marker, value marker, and completed marker are customizable`, () => {
  const bar = progressBar({ bar: { completedMarker: '=', incompleteMarker: ' ' }, value: { marker: '*' } })
  const actual = bar.render(0.5)
  assertRendering(actual, '[============*           ] 50%')
})

test('marker can only be a single character (string of length 1)', () => {
  a.throws(() => progressBar({ bar: { incompleteMarker: 'ab' } }), InvalidMarker)
  a.throws(() => progressBar({ bar: { incompleteMarker: '' } }), InvalidMarker)
  a.throws(() => progressBar({ bar: { completedMarker: 'ab' } }), InvalidMarker)
  a.throws(() => progressBar({ bar: { completedMarker: '' } }), InvalidMarker)
  a.throws(() => progressBar({ value: { marker: 'ab' } }), InvalidMarker)
  a.throws(() => progressBar({ value: { marker: '' } }), InvalidMarker)
})

test('if only specify one value marker, it will be used on all values', () => {
  const bar = progressBar({ value: { marker: '*' } })
  const actual = bar.render(0.5, 1)
  t.strictEqual(actual, '[---------*--------*] 50% 100%')
})

test('total length defaults to 30', () => {
  const bar = progressBar()
  const actuals = [bar.render(0), bar.render(0.5), bar.render(1)]
  assertRendering(actuals[0], '[|------------------------] 0%')
  assertRendering(actuals[1], '[------------|-----------] 50%')
  assertRendering(actuals[2], '[----------------------|] 100%')
})

test('total length is customizable', () => {
  const bar = progressBar({ length: 20 })
  const actuals = [bar.render(0), bar.render(0.5), bar.render(1)]
  assertRendering(actuals[0], '[|--------------] 0%', 20)
  assertRendering(actuals[1], '[-------|------] 50%', 20)
  assertRendering(actuals[2], '[------------|] 100%', 20)
})

test('when creating the progress bar, if total length causes the bar to be shorter than 3 characters long, it will throws LengthTooShort', () => {
  progressBar({ length: 10 })
  a.throws(() => progressBar({ length: 9 }), LengthTooShort)
  progressBar({ length: 13, value: { digits: 2 } })
  a.throws(() => progressBar({ length: 12, value: { digits: 2 } }), LengthTooShort)
})

test('when rendering, if total length causes the bar to be shorter than 3 characters long, it will throws LengthTooShort', () => {
  a.throws(() => progressBar({ length: 12 }).render(0.1, 0.2), LengthTooShort)
})

test('max value is default to 1', () => {
  const bar = progressBar()
  const actuals = [bar.render(0), bar.render(0.5), bar.render(1)]
  assertRendering(actuals[0], '[|------------------------] 0%')
  assertRendering(actuals[1], '[------------|-----------] 50%')
  assertRendering(actuals[2], '[----------------------|] 100%')
})

test('render value can go beyond max value', () => {
  const bar = progressBar()
  const actuals = [bar.render(1), bar.render(1.5), bar.render(2)]
  assertRendering(actuals[0], '[----------------------|] 100%')
  assertRendering(actuals[1], '[----------------------|] 150%')
  assertRendering(actuals[2], '[----------------------|] 200%')
})

test('max value is customizable', () => {
  const bar = progressBar({ value: { max: 10 } })
  const actuals = [bar.render(0), bar.render(5), bar.render(10)]
  assertRendering(actuals[0], '[|------------------------] 0%')
  assertRendering(actuals[1], '[------------|-----------] 50%')
  assertRendering(actuals[2], '[----------------------|] 100%')
})

test('max value must be greater than 0', () => {
  a.throws(() => progressBar({ value: { max: 0 } }), MaxValueOutOfBound)
  a.throws(() => progressBar({ value: { max: -1 } }), MaxValueOutOfBound)
})

test('single max value applies to all values', () => {
  const bar = progressBar({ value: { max: 10 } })
  const actual = bar.render(5, 10)
  assertRendering(actual, '[---------|--------|] 50% 100%')
})


test('same value overlaps, first value take precedent', () => {
  const bar = progressBar({ value: [{ marker: '|' }, { marker: '*' }] })
  const actual = bar.render(0.5, 0.5)
  t.strictEqual(actual, '[----------|---------] 50% 50%')
})
