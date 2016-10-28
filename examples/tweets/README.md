#Resocket Middleware Example - Tweets

This app was built with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to

`cd` to `examples/tweets`

```
npm start
```
This would run a mock server integrated with `socket.io` and would run the client code.

Open [http://localhost:3000](http://localhost:3000) in browser.

## Server

On running the app, you would be getting `Sports Tweets` and `Tech Tweets` after a regular time interval.

This is under a `timeout` set on server to `emit` tweets to all connected sockets.

Also, when you add a new tweet, server would push the new tweet to all connected listeners.



## React - Redux Usage:

Since,[Resocket](https://github.com/laumair/resocket) brings you the flexibility and option to either use it via `middleware` or manage the thin wrapper on your own.

However, this examples specifically uses the [Resocket](https://github.com/laumair/resocket) middleware.

### Basic usage with redux
```javascript

import Resocket, { createResocketMiddleware } from 'resocket'

// url e.g: http://localhost:3000

const socket = Resocket.connect(url);

/**
 * arrayOfEventNames should be the list of events that you want to emit to server.
 * Event names should match the action types that you have specified in your action creators.
 */
const resocketMiddleware = createResocketMiddleware(socket, arrayOfEventNamesToEmitTo);

const middleware = applyMiddleware(logger(), thunk, resocketMiddleware);

```

And that is all you need to get going with using `sockets` all over your app.

**Note:**
List of events/types to emit to should generally be exported. They should exactly match the action types on which you want to emit a specific event.

Please see [Resocket documentation](https://github.com/laumair/resocket/blob/master/README.md) for further API usage.

## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, feel free to [share your thoughts](https://github.com/laumair/resocket/issues)
