import * as actions from './tweets.actionCreators';

export function addListenersTo(payload) {
  return (dispatch) => {
    dispatch(actions.addListenersTo(payload));
  };
}

export function removeSelected(payload) {
  return (dispatch) => {
    dispatch(actions.removeListenersFrom(payload));
  };
}

export function removeAll() {
  return (dispatch) => {
    dispatch(actions.removeAllListeners());
  };
}

export function addNewTweet(payload) {
  return (dispatch) => {
    dispatch(actions.addNewTweet(payload));
  };
}

