# progress-str

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Circle CI][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]

[![Greenkeeper badge][green-keeper-image]][green-keeper-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

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
    incompleteMarker: '-' // marker for incomplete section of the bar
    leftBracketMarker: '['
    rightBracketMarker: ']'
  },
  length: 30, // total length of the result, including the text
  textAlign: 'left', // align text relative to max possible text length of each entry.
  textPosition: 'right', // 'left' | 'right' | 'none'
  value: {
    digits: 1 // number of fraction digits. 0 | 1 | 2.
              // It defaults to different values depending on the max value.
    max: 1, // Value that means 100%
    marker: '|', // marker for the value
    textStyle: 'percentage', // 'percentage' | 'number' | 'ratio'
    textTransform(text: string): string, // transform the styled string, can use this to color the text
  }
})

// To style multiple values differently.
progressBar({
  ...
  value: [{ ... }, { ... }, ...]
})
```

[circleci-image]: https://circleci.com/gh/unional/progress-str/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/progress-str/tree/master
[codecov-image]: https://codecov.io/gh/unional/progress-str/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/progress-str
[downloads-image]: https://img.shields.io/npm/dm/progress-str.svg?style=flat
[downloads-url]: https://npmjs.org/package/progress-str
[green-keeper-image]:https://badges.greenkeeper.io/unional/progress-str.svg
[green-keeper-url]:https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/progress-str.svg?style=flat
[npm-url]: https://npmjs.org/package/progress-str
[semantic-release-image]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
