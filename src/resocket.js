import io from 'socket.io-client';
import {
  isArray,
  isString,
  errorMessages,
} from './helpers';

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

const SocketDefaults = {
  auth: true,
  reconnection: true,
  reconnectionDelay: 1000,
};

function connect(params, opts) {
  const defaults = Object.assign({}, SocketDefaults, opts);

  if (params && defaults.auth) {
    Resocket.socket = io.connect(params, defaults);
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

export default Resocket;
