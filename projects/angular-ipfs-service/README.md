<a href="https://github.com/ocknamo/angular-ipfs-service/actions?query=workflow%3Acode-validation-and-tests">
  <img src="https://github.com/ocknamo/angular-ipfs-service/workflows/code-validation-and-tests/badge.svg"/>
</a>
<a href="https://codecov.io/gh/ocknamo/angular-ipfs-service">
  <img src="https://codecov.io/gh/ocknamo/angular-ipfs-service/branch/main/graph/badge.svg?token=QK38OUHXNS"/>
</a>

# NgIpfsService

Wrapper service of ipfs-core for Angular application.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Installation

```bash
$ npm install angular-ipfs-service
```

## Features

Start Ipfs node and inject to your application.

## Methods

- [`NgIpfsService.start()`](#NgIpfsServicestart)
- [`NgIpfsService.get()`](#NgIpfsServiceget)

### `NgIpfsService.start([options])`

Start Ipfs node.

#### Returns

`Promise<void>`

#### options

[options of IPFS.crate](https://github.com/ipfs/js-ipfs/blob/master/docs/MODULE.md#ipfscreateoptions)

### `NgIpfsService.get()`

Get Ipfs Instance.

#### Returns

`Promise<IPFS>`

## API of IPFS

[IPFS Core API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api#ipfs-core-api)

## Application setting

### custom-webpack setting

Using custom webpack config is recommened in order to provide more better node polyfills.

- Use [@angular-builders/custom-webpack](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack).
- Add config file as follow.

```extra-webpack.config.ts
// extra-webpack.config.ts
import { Configuration, ProvidePlugin } from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export default {
  plugins: [
    new NodePolyfillPlugin(),
    new ProvidePlugin({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Buffer: ['buffer', 'Buffer'],
      global: ['global'],
      process: 'process/browser',
    }),
  ],
} as Configuration;

```

### tsconfig.json

- Sorry, "strict" mode is not supported now.
- Set the "skipLibCheck" to "true".
- Set the "allowSyntheticDefaultImports" to true.
- Set stream path to stream-browserify as follow.

```tsconfig.json
  "compilerOptions": {
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "paths": {
      "stream": [
        "node_modules/stream-browserify"
      ]
    }
  }
```
