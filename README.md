# resocket

[![travis build](https://img.shields.io/travis/laumair/resocket.svg?style=flat-square)](https://travis-ci.org/laumair/resocket)
[![version](https://img.shields.io/npm/v/resocket.svg)](https://www.npmjs.com/package/resocket)
[![MIT License](https://img.shields.io/npm/l/resocket.svg)](http://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/laumair/resocket/badge.svg?branch=master)](https://coveralls.io/github/laumair/resocket?branch=master)
[![npm](https://img.shields.io/npm/dt/resocket.svg)](https://www.npmjs.com/package/resocket)

Resocket is a `socket.io` wrapper and middleware for `React` and `Redux` applications.

It helps you abstract away all the `socket.io` implementations in your app.

You can use [Resocket](https://github.com/laumair/resocket) separately without using the `createResocketMiddleware` to have more control over the socket implementation.

### Installation

```
npm install --save resocket
```
### Influences

Using `socket.io` with `React-redux` applications does not allow you to much abstraction and increases complexity.
With [Resocket](https://github.com/laumair/resocket), it provides you with a bit abstraction and leads to a cleaner code.
If you want more abstraction and allow [Resocket](https://github.com/laumair/resocket) middleware to do more of the stuff,
all you need is to import `createResocketMiddleware`. Resocket only takes a few minutes to get started with.

## Basic Usage

**Middleware**
```javascript
import Resocket, { createResocketMiddleware } from 'resocket';

const socket = Resocket.connect(url, opts);
const resocketMiddleware = createResocketMiddleware(socket, listOfEventsToEmitTo);

const middleware = applyMiddleware(thunk, resocketMiddleware);
```

[API docs resocketMiddleware](/docs/resocketMiddleware.md)

**Resocket**

All you need to do is to call the `connect` method on Resocket and use anywhere across your React-redux app.
```javascript
import { render } from 'react-dom';
import Resocket from 'resocket'

Resocket.connect(url);

//...
render();
```

- url: Any url for establishing a socket connection e.g: `http://localhost:9000`
- opts: `optional` These are the default optional parameters.
Default parameters are:
```javascript
auth: true,
reconnection: true,
reconnectionDelay: 1000        
```

You can override them simply by passing for example:

```javascript
Resocket.connect('http://localhost:3000', {auth: false});
```

You can also extend the options object with socket.io accepted parameters:

```javascript
Resocket.connect('http://localhost:3000', {transports: ['polling']});
```

**Note:** On passing `auth: false` Resocket won't allow a connection to be established. This is useful when you want to allow a connection to be only built after Login or some basic authentication.

[API docs Resocket](/docs/Resocket.md)


### Middleware Example

- [Tweets Example - Resocket middleware](https://github.com/laumair/resocket/tree/master/examples)

### Thanks

No other than `socket.io` and of course to `React` and `Redux`

### License

MIT
