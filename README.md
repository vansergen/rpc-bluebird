# rpc-bluebird ![CI Status](https://github.com/vansergen/rpc-bluebird/workflows/CI/badge.svg) ![npm](https://img.shields.io/npm/v/rpc-bluebird) [![Coverage Status](https://coveralls.io/repos/github/vansergen/rpc-bluebird/badge.svg?branch=main)](https://coveralls.io/github/vansergen/rpc-bluebird?branch=main) [![Known Vulnerabilities](https://snyk.io/test/github/vansergen/rpc-bluebird/badge.svg)](https://snyk.io/test/github/vansergen/rpc-bluebird) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) ![NPM license](https://img.shields.io/npm/l/rpc-bluebird) ![node version](https://img.shields.io/node/v/rpc-bluebird) ![npm downloads](https://img.shields.io/npm/dt/rpc-bluebird) ![GitHub top language](https://img.shields.io/github/languages/top/vansergen/rpc-bluebird)

`rpc-bluebird` is a simple wrapper of the [`node-fetch`](https://github.com/node-fetch/node-fetch) library in a class. Note, that the [`Blubird`](https://github.com/petkaantonov/bluebird/) promise library is used instead of native promises.

## Installation

```bash
npm install rpc-bluebird
```

## Usage

`rpc-bluebird` accepts the following parameters

```typescript
const fetchClientOptions = {
  baseUrl: "http://worldtimeapi.org/", // used to resolve the url - `new URL(path, baseUrl)`
  rejectNotOk: false, // default - `true`, reject a promise on non 2xx responses
  transform: "text", // default - `'raw'`
};
```

as `fetchClientOptions`. Please refer to the [`node-fetch` documentation](https://github.com/node-fetch/node-fetch#options) for the full list of all supported options you can pass as `fetchOptions`.

```typescript
import { FetchClient } from "rpc-bluebird";
const fetchOptions = { headers: { "User-Agent": "MyClass-User-Agent" } };
const fetchClientOptions = { baseUrl: "http://worldtimeapi.org/" };
const path = "/api/ip";
class MyClass extends FetchClient {
  constructor() {
    super(fetchOptions, fetchClientOptions);
  }
}
const myClass = new MyClass();
const bluebirdPromise = myClass.fetch(path);
bluebirdPromise
  .then((response) => {
    console.info(bluebirdPromise.isResolved());
    response.json().then(console.log).catch(console.error);
  })
  .catch(console.error);
console.info(bluebirdPromise.isPending());
```

- `fetch`

```typescript
import FetchClient from "rpc-bluebird";
const client = new FetchClient<unknown>({}, { transform: "json" });
client
  .fetch("http://worldtimeapi.org/api/ip")
  .then(console.log)
  .catch(console.error);
```

### HTTP methods.

- `get`

```typescript
const client = new FetchClient<Buffer>({}, { transform: "buffer" });
client
  .get("http://worldtimeapi.org/api/ip")
  .then((data) => {
    console.log(data instanceof Buffer);
  })
  .catch(console.error);
```

- `post`

```typescript
const client = new FetchClient<Buffer>(
  { body: JSON.stringify({ data: "Hello World!" }) },
  { transform: "buffer" }
);
client
  .post("https://httpbin.org/anything")
  .then((data) => {
    console.log(data instanceof Buffer);
  })
  .catch(console.error);
```

- `put`

```typescript
const client = new FetchClient<ArrayBuffer>(
  { body: JSON.stringify({ data: "Hello World!" }) },
  { transform: "arrayBuffer" }
);
client
  .put("https://httpbin.org/anything")
  .then((data) => {
    console.log(data instanceof ArrayBuffer);
  })
  .catch(console.error);
```

- `patch`

```typescript
import Blob from "fetch-blob";
const client = new FetchClient<Blob>(
  { body: JSON.stringify({ data: "Hello World!" }) },
  { transform: "blob", rejectNotOk: true }
);
client
  .patch("https://httpbin.org/anything")
  .then((data) => {
    console.log(data instanceof Blob);
  })
  .catch(console.error);
```

- `delete`

```typescript
const baseUrl = "https://httpbin.org/";
const client = new FetchClient<string>({ transform: "text", baseUrl });
client
  .delete("/anything")
  .then((data) => {
    console.log(typeof data === "string");
  })
  .catch(console.error);
```

- `head`

```typescript
import { UnsuccessfulFetch, FetchClient } from "rpc-bluebird";
const baseUrl = "http://worldtimeapi.org/";
const client = new FetchClient<unknown>({}, { transform: "json", baseUrl });
client
  .head("/badurl")
  .then(console.log)
  .catch((error) => {
    if (error instanceof UnsuccessfulFetch) {
      console.log(error.response.status); // 404
    } else {
      console.error(error);
    }
  });
```

- `options`

```typescript
const baseUrl = "https://httpbin.org/";
const client = new FetchClient<unknown>({}, { transform: "json", baseUrl });
client.options("/anything").then(console.log).catch(console.error);
```
