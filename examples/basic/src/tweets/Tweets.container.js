import {connect} from 'react-redux';
import Tweets from './Tweets.component';
import * as actions from './tweets.actions';


const mapStateToProps = state => ({
  sportsTweets: state.tweets.sportsTweets,
  techTweets: state.tweets.techTweets
});

const mapDispatchToProps = dispatch => ({
  addListenersTo: (events) => dispatch(actions.addListenersTo(events)),
  removeSelected: events => dispatch(actions.removeSelected(events)),
  removeAll: () => dispatch(actions.removeAll()),
  addNewTweet: tweet => dispatch(actions.addNewTweet(tweet))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);