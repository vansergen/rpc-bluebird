# rpc-bluebird

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
  .then(data => console.log(data))
  .catch(error => console.error(error))
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
