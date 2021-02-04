# NgIpfsService

Wrapper service of ipfs-core for Angular application.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Features

Start Ipfs node and inject to your application.

## API

- [`NgIpfsService.start()`](#NgIpfsServicestart)
- [`NgIpfsService.getIpfs()`](#NgIpfsServicegetIpfs)

### `NgIpfsService.start()`

Start Ipfs node.

### `NgIpfsService.getIpfs()`

Get Ipfs Instance.

## API of IPFS

[IPFS Core API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api#ipfs-core-api)

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `yarn build`, go to the dist folder `cd dist/ng-ipfs-service` and run `npm publish`.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

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