# resocket

[![travis build](https://img.shields.io/travis/laumair/resocket.svg?style=flat-square)](https://travis-ci.org/laumair/resocket)
[![version](https://img.shields.io/npm/v/resocket.svg)](https://www.npmjs.com/package/resocket)
[![MIT License](https://img.shields.io/npm/l/resocket.svg)](http://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/laumair/resocket/badge.svg?branch=master)](https://coveralls.io/github/laumair/resocket?branch=master)

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

### Usage

**Middleware**
```javascript
import Resocket, { createResocketMiddleware } from 'resocket';

const socket = Resocket.connect(url, opts);
const resocketMiddleware = createResocketMiddleware(socket, listOfEventsToEmitTo);

const middleware = applyMiddleware(thunk, resocketMiddleware);
```

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
- opts: `optional` These are optional parameters allowed. 
Default parameters are:
```javascript
auth: true, 
reconnection: true, 
reconnectionDelay: 1000        
```

You can ovveride them simply by passing for example:

```javascript
Resocket.connect(http://localhost:3000, {auth: false});
```

**Note:** On passing `auth: false` Resocket won't allow a connection to be established. This is useful when you want to allow a connection to be only built after Login or some basic authentication.

### How to
In your **container** component, you can do:

```javascript
const mapDispatchToProps = dispatch => ({
  newMessage: message => dispatch(actions.newMessage(message))
  //...
});
```

You can emit in your actions:

```javascript
export function newMessage(payload) {
  return dispatch => {
    dispatch(actions.someAction());
    Resocket.emit('someEvent', payload);
  };
}

```

Or you can listen to events and dispatch redux actions on the basis of that:

```javascript
export function alertNewMessage() {
  return dispatch => {
    Resocket.on('message', message => {
      dispatch(actions.updateMessages(message));
    });
  };
}

```

Every time you receive a new message via socket, `actions.updateMessages()` would be dispatched with the payload server sends.

**Usage with lifecycle methods**
You can use it with `React life cycle methods` to remove some specific listener or remove all listeners.

```javascript
componentWillUnmount() {
    this.props.removeListener('message'); 
}
```
```
const mapDispatchToProps = dispatch => ({
  removeListener: event => dispatch(actions.removeListener(event))
  //...
});
```

And then, in your actions you can simply 

```javascript
export function removeListener(event) {
  return dispatch => {
    Resocket.removeListener(event);
    dispatch(); // If needed
  };
}

```

When this is called, you would not get any message hence any action dispatch from the event specified.

**Note:** You can also remove all listeners from the connection by calling `removeAllListeners` on `Resocket`

### resocketMiddleware

#### Server

```javascript
io.emit('TECH_TWEETS', {
  type: 'UPDATE_TECH_TWEETS',
  payload: {} // some data
});
```

**Note:** `type` and `payload` are necessary keys because they would dispatch the same action automatically and match the case in your reducers. 

`resocketMiddleware` takes care of the rest.

```javascript
case Types.UPDATE_SPORTS_TWEETS:
      return {
        ...state,
        sportsTweets: [...state.sportsTweets, action.payload],
      };
```

#### Client

For listening to a certain event, you need to dispatch an action of type 

```
ADD_LISTENER_TO or ADD_LISTENERS_TO
```
As the name suggest, you would have to pass either a string or an array of strings as event names and `resocketMiddleware` would start listening to the events passed as arguments.

**Example**
```javascript
this.props.addListenersTo(['EVENT_1', 'EVENT_2']);

```

**Note** In your server configuration, `EVENT_1` and `EVENT_2` should be the event names that are emitters.

You can remove listeners by dispatching an action of type

```
REMOVE_LISTENER_FROM or REMOVE_LISTENERS_FROM
```

It expects an array of strings or just a string and it would stop listening to any events specified.

```
componentWillUnmount() {
this.props.removeListener('EVENT_1');

}
```

where in your actions
```javascript
export function removeListener(payload) {
    return dispatch => {
        type: 'REMOVE_LISTENER_FROM',
        payload
    };
}

```

You can simply emit an action by calling the eventNamesList passed as a second argument while instantiating resocketMiddleware.


```javascript

const resocketMiddleware = createResocketMiddleware(socket, ['tweet']);

```
In your actions, simply

```javascript
export function addNewTweet(payload) {
  return (dispatch) => {
    dispatch({ type: 'tweet', payload });
  };
}

```

While on server

```javascript
socket.on('tweet', function(data) {
    io.emit(data.type, {
      type: 'UPDATE_' + data.type,
      payload: data.tweet // or whatever your properties are
    });
  });
```

### Middleware Example

- [Tweets Example - Resocket middleware](https://github.com/laumair/resocket/tree/master/examples)



### Thanks

No other than `socket.io` and of course to `React` and `Redux`

### License

MIT

