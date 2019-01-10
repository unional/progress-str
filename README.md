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

## Single value progress bar

```ts
import { progressBar } from 'progress-str'

const progress = progressBar()

progress.render(0.5) // [-----------|----------] 50.0%
```

### progressBar(options)

```ts
progressBar({
  length: 30, // total length of the result, including the numeric value
  maxValue: 1, // Value that means 100%
  barFormat: {
    completedChar: '-', // character for completed section of the bar
    incompleteChar: '-' // character for incomplete section of the bar
  },
  valueFormat: {
    valueChar: '|' // character for the value
  }
})
```

## Two values progress bar

```ts
import { twoValuesProgressBar } from 'progress-str'

const progress = twoValuesProgressBar()

progress.render(0.5, 1) // [--------|------|] 50.0% 100.0%
```

### twoValuesProgressBar(options)

```ts
twoValuesProgressBar({
  length: 30, // total length of the result, including the numeric value
  maxValue: 1, // Value that means 100%
  barFormat: {
    completedChar: '-', // character for completed section of the bar
    incompleteChar: '-' // character for incomplete section of the bar
  },
  valueFormat: {
    valueChar: '|' // character for the value
  },
  // or
  valueFormat: [
    // for first value
    { valueChar: '|' },
    // for second value
    { valueChar: '*' }
  ]
})
```

## TODO

```sh
(=====    ) 50.0%
39% [======          ]
[---A---B---]
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
