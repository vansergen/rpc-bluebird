# rpc-bluebird ![CI Status](https://github.com/vansergen/rpc-bluebird/workflows/CI/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/vansergen/rpc-bluebird/badge.svg)](https://coveralls.io/github/vansergen/rpc-bluebird) ![GitHub version](https://badge.fury.io/gh/vansergen%2Frpc-bluebird.svg) ![Node version](https://img.shields.io/node/v/rpc-bluebird) [![Known Vulnerabilities](https://snyk.io/test/github/vansergen/rpc-bluebird/badge.svg)](https://snyk.io/test/github/vansergen/rpc-bluebird) ![NPM license](https://img.shields.io/npm/l/rpc-bluebird) ![npm downloads](https://img.shields.io/npm/dt/rpc-bluebird) ![GitHub top language](https://img.shields.io/github/languages/top/vansergen/rpc-bluebird)

`rpc-bluebird` is a simple wrapper of the [`request-promise`](https://github.com/request/request-promise) library in a class.

## Installation

```bash
npm install rpc-bluebird
```

## Usage

Please refer to the [`request` documentation](https://github.com/request/request#requestdefaultsoptions) for the full list of all supported options you can pass to the constructor.

```typescript
import { RPC } from "rpc-bluebird";
class MyClass extends RPC {
  constructor() {
    super({ uri: "http://worldtimeapi.org/api/ip", json: true });
  }
}
const myClass = new MyClass();
myClass
  .get()
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
  .lastly(() => console.log("It is working with bluebird promises"));
```

- [`request`](https://github.com/request/request#requestoptions-callback)

```javascript
await rpc.request(options);
```

The following convenience methods correspond to HTTP request methods.

- `get`

```javascript
await rpc.get(options);
```

- `post`

```javascript
await rpc.post(options);
```

- `put`

```javascript
await rpc.put(options);
```

- `patch`

```javascript
await rpc.patch(options);
```

- `delete`

```javascript
await rpc.delete(options);
```

- `head`

```javascript
await rpc.head(options);
```

- `options`

```javascript
await rpc.options(options);
```

The following static methods are also available to manage cookies:

- [`cookie`](https://github.com/request/request/#requestcookie)

```javascript
// creates a new cookie.
const key = "key";
const value = "value";
const myCookie = RPC.cookie(key, value);
```

- [`jar`](https://github.com/request/request/#requestjar)

```javascript
// creates a new cookie jar.
const myJar = RPC.jar();
```
