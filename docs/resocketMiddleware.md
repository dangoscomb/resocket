## resocketMiddleware Usage

### Server

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

## Example

For more detailed usage of `resocketMiddleware` please see:
- [Tweets Example - Resocket middleware](https://github.com/laumair/resocket/tree/master/examples)
