import {
  isArray,
  isString,
  types,
  errorMessages
} from './helpers';


function createResocketMiddleware(socket, toEmit) {
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

export default createResocketMiddleware;