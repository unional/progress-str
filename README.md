# progress-str

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Circle CI][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]

[![Greenkeeper badge][green-keeper-image]][green-keeper-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

Create a string based progress bar

## Usage

```ts
import { progressBar } from 'progress-str'

const progress = progressBar()

progress.render(0.5)       // [-----------|----------] 50.0%

// Also support multiple values
progress.render(0, 0.5, 1) // [|----|---|] 0.0% 50.0% 100.0%
```

## Configure

```ts
progressBar({
  bar: {
    completedMarker: '-', // marker for completed section of the bar
    incompleteMarker: '-' // marker for incomplete section of the bar
  },
  length: 30, // total length of the result, including the text
  textPosition: 'right', // 'left' | 'right'
  textStyle: 'percentage', // 'percentage' | 'number' | 'ratio'
  value: {
    digits: 1 // number of fraction digits. 0 | 1 | 2
    max: 1, // Value that means 100%
    marker: '|' // marker for the value
  }
})

// To style multiple values
progressBar({
  ...
  values: [{ ... }, { ... }, ...]
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
