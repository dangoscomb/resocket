import Types from './tweets.actionTypes';

const initialState = {
  techTweets: [],
  sportsTweets: []
};

export default function tweetsReducer(state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_SPORTS_TWEETS:
      return {
        ...state,
        sportsTweets: [...state.sportsTweets, action.payload]
      };
    case Types.UPDATE_TECH_TWEETS:
      return {
        ...state,
        techTweets: [...state.techTweets, action.payload]
      };
    default:
      return state;
  }
}

