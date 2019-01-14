import t from 'assert';
import { createValueEntry } from './ValueEntry';

test('maxLength for percentage is 4 (100%)', () => {
  const entry = createValueEntry({ textStyle: 'percentage', marker: 'x', max: 1 }, 1);
  t.strictEqual(entry.maxLength, 4)
})

test('maxLength for percentage is adjusted with digits', () => {
  const entry = createValueEntry({ textStyle: 'percentage', digits: 2, marker: 'x', max: 1 }, 1);
  t.strictEqual(entry.maxLength, 7)
})

test('maxLength for percentage is adjusted with transform', () => {
  const entry = createValueEntry({ textStyle: 'percentage', textTransform: v => `${v} xx`, marker: 'x', max: 1 }, 1);
  t.strictEqual(entry.maxLength, 7)
})

test('maxLength for percentage is adjusted with digits and transfrom', () => {
  const entry = createValueEntry({ textStyle: 'percentage', textTransform: v => `${v} xx`, digits: 2, marker: 'x', max: 1 }, 1);
  t.strictEqual(entry.maxLength, 10)
})

test('maxLength for number is based on max value', () => {
  t.strictEqual(createValueEntry({ textStyle: 'number', marker: 'x', max: 0.25 }, 1).maxLength, 5) // '0.123'
  t.strictEqual(createValueEntry({ textStyle: 'number', marker: 'x', max: 1 }, 1).maxLength, 3) // '0.9'
  t.strictEqual(createValueEntry({ textStyle: 'number', marker: 'x', max: 10 }, 1).maxLength, 2) // '10'
  t.strictEqual(createValueEntry({ textStyle: 'number', marker: 'x', max: 100 }, 1).maxLength, 3) // '100'
})

test('maxLength for number is adjusted with digits', () => {
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, marker: 'x', max: 0.25 }, 1).maxLength, 4) // '0.01'
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, marker: 'x', max: 1 }, 1).maxLength, 4) // '0.01'
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, marker: 'x', max: 10 }, 1).maxLength, 5) // '10.01`
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, marker: 'x', max: 100 }, 1).maxLength, 6) // '100.01'
})

test('maxLength for number is adjusted with transform', () => {
  t.strictEqual(createValueEntry({ textStyle: 'number', textTransform: v => `${v} xx`, marker: 'x', max: 0.25 }, 1).maxLength, 8) // '0.123 xx'
  t.strictEqual(createValueEntry({ textStyle: 'number', textTransform: v => `${v} xx`, marker: 'x', max: 1 }, 1).maxLength, 6) // '0.1 xx'
  t.strictEqual(createValueEntry({ textStyle: 'number', textTransform: v => `${v} xx`, marker: 'x', max: 10 }, 1).maxLength, 5) // '10 xx'
  t.strictEqual(createValueEntry({ textStyle: 'number', textTransform: v => `${v} xx`, marker: 'x', max: 100 }, 1).maxLength, 6) // '100 xx'
})

test('maxLength for number is adjusted with digits and transfrom', () => {
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 0.25 }, 1).maxLength, 7) // '0.01 xx'
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 1 }, 1).maxLength, 7) // '0.01 xx'
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 10 }, 1).maxLength, 8) // '10.01 xx'
  t.strictEqual(createValueEntry({ textStyle: 'number', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 100 }, 1).maxLength, 9) // '100.01 xx'
})

test('maxLength for ratio is based on max value', () => {
  t.strictEqual(createValueEntry({ textStyle: 'ratio', marker: 'x', max: 0.25 }, 1).maxLength, 10) // '0.001/0.25'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', marker: 'x', max: 1 }, 1).maxLength, 5) // '0.1/1'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', marker: 'x', max: 10 }, 1).maxLength, 5) // '10/10'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', marker: 'x', max: 100 }, 1).maxLength, 7) // '100/100'
})

test('maxLength for ratio is adjusted with digits', () => {
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, marker: 'x', max: 0.25 }, 1).maxLength, 9) // '0.01/0.25'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, marker: 'x', max: 1 }, 1).maxLength, 9) // '0.01/1.00'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, marker: 'x', max: 10 }, 1).maxLength, 11) // '10.01/10.00`
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, marker: 'x', max: 100 }, 1).maxLength, 13) // '100.01/100.00'
})

test('maxLength for ratio is adjusted with transform', () => {
  t.strictEqual(createValueEntry({ textStyle: 'ratio', textTransform: v => `${v} xx`, marker: 'x', max: 0.25 }, 1).maxLength, 13) // '0.001/0.25 xx'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', textTransform: v => `${v} xx`, marker: 'x', max: 1 }, 1).maxLength, 8) // '0.1/1 xx'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', textTransform: v => `${v} xx`, marker: 'x', max: 10 }, 1).maxLength, 8) // '10/10 xx'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', textTransform: v => `${v} xx`, marker: 'x', max: 100 }, 1).maxLength, 10) // '100/100 xx'
})

test('maxLength for ratio is adjusted with digits and transfrom', () => {
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 0.25 }, 1).maxLength, 12) // '0.01/0.25 xx'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 1 }, 1).maxLength, 12) // '0.01/1.00 xx'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 10 }, 1).maxLength, 14) // '10.01/10.00 xx'
  t.strictEqual(createValueEntry({ textStyle: 'ratio', digits: 2, textTransform: v => `${v} xx`, marker: 'x', max: 100 }, 1).maxLength, 16) // '100.01/100.00 xx'
})

