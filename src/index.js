import io from 'socket.io-client';

const types = {
  REMOVE_LISTENER_FROM: 'REMOVE_LISTENER_FROM', // just for brevity
  REMOVE_LISTENERS_FROM: 'REMOVE_LISTENERS_FROM',
  ADD_LISTENER_TO: 'ADD_LISTENER_FROM',
  ADD_LISTENERS_TO: 'ADD_LISTENERS_FROM',
  REMOVE_ALL_LISTENERS: 'REMOVE_ALL_LISTENERS',
};

const errorMessages = {
  SHOULD_BE_AN_ARRAY_OR_STRING: 'Event names should either be an array of strings or just a string.',
  SHOULD_BE_AN_ARRAY: 'Event names should be an array of strings',
  CONNECTION_ERROR: 'An error has been occurred while creating a connection.',
};

const isArray = payload => Array.isArray(payload);

const isString = payload => typeof payload === 'string';

/* eslint-disable no-use-before-define */
/* eslint-disable no-console */


const Resocket = {
  connect,
  emit,
  on,
  removeListener,
  removeAllListeners,
  socket: null,
};

function connect(params, { auth = true, reconnection = true, reconnectionDelay = 1000 } = {}) {
  if (params && auth) {
    Resocket.socket = io.connect(params, { auth, reconnection, reconnectionDelay });
    return Resocket.socket;
  }

  return console.error(errorMessages.CONNECTION_ERROR);
}

function on(eventName, callback) {
  if (Resocket.socket) {
    Resocket.socket.on(eventName, (data) => {
      callback(data);
    });
  }
}

function emit(eventName, data) {
  if (Resocket.socket) {
    Resocket.socket.emit(eventName, data);
  }
}

function removeListener(eventName) {
  if (Resocket.socket) {
    if (isString(eventName)) {
      Resocket.socket.removeListener(eventName);
    } else if (isArray(eventName)) {
      eventName.forEach((e) => {
        Resocket.socket.removeListener(e);
      });
    } else {
      console.error(errorMessages.SHOULD_BE_AN_ARRAY_OR_STRING);
    }
  }
}

function removeAllListeners() {
  if (Resocket.socket) {
    Resocket.socket.removeAllListeners();
  }
}

export function createResocketMiddleware(socket, toEmit) {
  return ({ dispatch }) => next => action => { // eslint-disable-line arrow-parens
    if (!isArray(toEmit)) {
      console.error(errorMessages.SHOULD_BE_AN_ARRAY);
    }

    if (action.type === types.REMOVE_LISTENER_FROM || types.REMOVE_LISTENERS_FROM) {
      if (isArray(action.payload)) {
        action.payload.forEach((event) => {
          socket.removeListener(event);
        });
      } else if (isString(action.payload)) {
        socket.removeListener(action.payload);
      } else {
        console.error(errorMessages.SHOULD_BE_AN_ARRAY_OR_STRING);
      }
    }

    if (action.type === types.ADD_LISTENER_TO || types.ADD_LISTENERS_TO) {
      if (isArray(action.payload)) {
        action.payload.forEach((e) => {
          socket.on(e, dispatch);
        });
      } else if (isString(action.payload)) {
        socket.on(action.payload, dispatch);
      } else {
        console.error(errorMessages.SHOULD_BE_AN_ARRAY_OR_STRING);
      }
    }

    if (action.type === types.REMOVE_ALL_LISTENERS) {
      socket.removeAllListeners();
    }

    if (isArray(toEmit)) {
      toEmit.forEach((event) => {
        if (event === action.type) {
          socket.emit(event, action.payload);
        }
      });
    }

    return next(action);
  };
}

export default Resocket;
