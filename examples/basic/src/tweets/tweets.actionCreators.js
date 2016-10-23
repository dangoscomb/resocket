import Types from './tweets.actionTypes';

export function addListenersTo(payload) {
  return {
    type: Types.ADD_LISTENERS_TO,
    payload
  };
}

export function removeListenersFrom(payload) {
  return {
    type: Types.REMOVE_LISTENER_FROM,
    payload
  };
}

export function removeAllListeners() {
  return {
    type: Types.REMOVE_ALL_LISTENERS
  };
}

export function addNewTweet(payload) {
  return {
    type: Types.TWEET,
    payload
  };
}
