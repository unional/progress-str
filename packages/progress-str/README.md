# progress-str

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![GitHub NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Visual Studio Code][vscode-image]][vscode-url]

Create a string based progress bar.

## Usage

```ts
import { progressBar } from 'progress-str'

const bar = progressBar()

bar.render(0.5)          // [-----------|-----------] 50%

// Also support multiple values
bar.render(0.25, 0.5, 1) // [---|--|-----|] 25%  50%  100%

// If the value is unknown/not available, pass in undefined:
bar.render(0.5, undefined) // [---------|----------] 0.5 ---
```

## Configure

```ts
progressBar({
  bar: {
    completedMarker: '-', // marker for completed section of the bar
    incompleteMarker: '-', // marker for incomplete section of the bar
    leftBracketMarker: '[',
    rightBracketMarker: ']',
  },
  length: 30, // total length of the result, including the text
  textAlign: 'left', // align text relative to max possible text length of each entry.
  textPosition: 'right', // 'left' | 'right' | 'none'
  value: {
    digits: 1, // number of fraction digits. 0 | 1 | 2.
              // It defaults to different values depending on the max value.
    max: 1, // Value that means 100%.
            // It can be set to undefined, to indicate that value is not available.
            // But the render value must also be undefined.
            // If not it will throws MissingMaxValue.
    marker: '|', // marker for the value
    textStyle: 'percentage', // 'percentage' | 'number' | 'ratio'
    textTransform(text: string): string, // transform the styled string, can use this to color the text
  }
})

// To style multiple values differently.
progressBar({
  ...,
  value: [{ ... }, { ... }, ...],
})
```

[codecov-image]: https://codecov.io/gh/cyberuni/progress-str/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/cyberuni/progress-str
[downloads-image]: https://img.shields.io/npm/dm/progress-str.svg?style=flat
[downloads-url]: https://npmjs.org/package/progress-str
[github-nodejs]: https://github.com/cyberuni/progress-str/actions/workflows/pull-request.yml/badge.svg
[github-action-url]: https://github.com/cyberuni/progress-str/actions
[npm-image]: https://img.shields.io/npm/v/progress-str.svg?style=flat
[npm-url]: https://npmjs.org/package/progress-str
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
