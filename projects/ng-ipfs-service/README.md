<a href="https://github.com/ocknamo/ng-ipfs-service/actions?query=workflow%3Acode-validation-and-tests">
  <img src="https://github.com/ocknamo/ng-ipfs-service/workflows/code-validation-and-tests/badge.svg"/>
</a>
<a href="https://codecov.io/gh/ocknamo/ng-ipfs-service">
  <img src="https://codecov.io/gh/ocknamo/ng-ipfs-service/branch/main/graph/badge.svg?token=QK38OUHXNS"/>
</a>

# NgIpfsService

Wrapper service of ipfs-core for Angular application.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Installation

```bash
$ npm install ng-ipfs-service
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

`IPFS`

## API of IPFS

[IPFS Core API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api#ipfs-core-api)

## Application setting

### Polyfills

Add the following to your src/polyfills.ts file.

```polyfills.ts
(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;
(window as any).process = {
  env: { DEBUG: undefined },
  version: [],
  nextTick: require('next-tick'),
};
```

### tsconfig.json

- Sorry, "strict" mode is not supported now.
- Set the "skipLibCheck" to "true".
- Set the "allowSyntheticDefaultImports" to true.

### tsconfig.app.json

- Add "node" into types array.
