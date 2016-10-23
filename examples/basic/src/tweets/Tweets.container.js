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
  sendMessage: message => dispatch(actions.sendMessage(message)),
  sendNumber: number => dispatch(actions.sendNumber(number))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);