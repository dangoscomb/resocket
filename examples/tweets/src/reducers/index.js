import { combineReducers } from 'redux';
import tweets from '../tweets/tweets.reducer';

const reducers = combineReducers({
  tweets,
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
