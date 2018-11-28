export function progressBar(currentValue: number, options: { length: number } = { length: 30 }) {
  const percent = toPercentage(currentValue, 1)
  const spaceLength = 1
  return `${toBar(currentValue, options.length - percent.length - spaceLength)} ${percent}`
}

function toBar(percent: number, length: number) {
  const bracketLength = 1
  const barInsideLength = length - bracketLength * 2
  const location = Math.round(percent * barInsideLength)
  const bar = new Array(barInsideLength).fill('-')
  bar[location] = '|'
  return `[${bar.join('')}]`
}

function toPercentage(value: number, fractionDigits: number) {
  return `${(value * 100).toFixed(fractionDigits)}%`
}
