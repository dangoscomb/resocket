## Resocket Usage

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
