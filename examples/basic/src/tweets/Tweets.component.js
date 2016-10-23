import map from 'lodash/map';
import React, {Component, PropTypes} from 'react';
import Button from '../partials/Button';

export default class Tweets extends Component {
    static propTypes = {
    sportsTweets: PropTypes.array.isRequired,
    techTweets: PropTypes.array.isRequired,
    addListenersTo: PropTypes.func.isRequired,
    removeSelected: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendNumber: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasUnsubscribedSports: false,
      hasUnsubscribedTech: false,
      hasUnsubscribedAll: false // listening at mount
    }
  }

  componentWillMount() {
    this.props.addListenersTo(['SPORTS_TWEETS', 'TECH_TWEETS']);
  }

  render() {
    const styles = {
      wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px'
      }
    };

    const sportsText = this.state.hasUnsubscribedSports ? 'Add' : 'Remove';
    const techText = this.state.hasUnsubscribedTech ? 'Add' : 'Remove';
    const generalText = !this.state.hasUnsubscribedAll ? 'Stop' : 'Start';
    return (
      <div>
        <div style={styles.wrapper}>
          <Button onClick={() => {
            !this.state.hasUnsubscribedSports ?
              this.props.removeSelected('SPORTS_TWEETS') :
              this.props.addListenersTo('SPORTS_TWEETS');
            this.setState({
              hasUnsubscribedSports: !this.state.hasUnsubscribedSports
            });
          }}>
            {`${sportsText}`} sports tweets listener</Button>
          <Button onClick={
            () => {
              !this.state.hasUnsubscribedTech ?
              this.props.removeSelected('TECH_TWEETS') :
              this.props.addListenersTo('TECH_TWEETS');
              this.setState({
                hasUnsubscribedTech : !this.state.hasUnsubscribedTech
              });
            }}>
            {`${techText}`} tech tweets listener</Button>

          <Button onClick={() => {
            !this.state.hasUnsubscribedAll ? this.props.removeAll() :
              this.props.addListenersTo(['SPORTS_TWEETS', 'TECH_TWEETS']);

            this.setState({
              hasUnsubscribedAll : !this.state.hasUnsubscribedAll
            });
          }}>
            {`${generalText}`} Getting Tweets</Button>
        </div>
        <div>
        <h3>Sports Tweets</h3>
        <ul>
          {
            map(this.props.sportsTweets, (tweet, i) => {
              return <li key={i}>{tweet}</li>;
            })
          }
        </ul>
          </div>
        <div>
          <h3>Tech Tweets</h3>
          <ul>
            {
              map(this.props.techTweets, (tweet, i) => {
                return <li key={i}>{tweet}</li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}