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

### `NgIpfsService.start()`

Start Ipfs node.

#### Returns

`Promise<void>`

### `NgIpfsService.get()`

Get Ipfs Instance.

#### Returns

`Ipfs | null`

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
