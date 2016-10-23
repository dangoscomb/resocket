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
    addNewTweet: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasUnsubscribedSports: false,
      hasUnsubscribedTech: false,
      hasUnsubscribedAll: false, // listening at mount,
      value: ' '
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.addListenersTo(['SPORTS_TWEETS', 'TECH_TWEETS']);
  }

  renderButtons(styles) {

    const sportsText = this.state.hasUnsubscribedSports ? 'Add' : 'Remove';
    const techText = this.state.hasUnsubscribedTech ? 'Add' : 'Remove';
    const generalText = !this.state.hasUnsubscribedAll ? 'Stop' : 'Start';

    return (
      <div style={styles}>
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
              hasUnsubscribedTech: !this.state.hasUnsubscribedTech
            });
          }}>
          {`${techText}`} tech tweets listener</Button>

        <Button onClick={() => {
          !this.state.hasUnsubscribedAll ? this.props.removeAll() :
            this.props.addListenersTo(['SPORTS_TWEETS', 'TECH_TWEETS']);

          this.setState({
            hasUnsubscribedAll: !this.state.hasUnsubscribedAll
          });
        }}>
          {`${generalText}`} Getting Tweets</Button>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onSubmit(type) {
    const payload = {
      type,
      tweet: this.state.value
    };

    this.props.addNewTweet(payload);
    this.setState({ value : ' '});
  }

  render() {
    const styles = {
      wrapper: {
        display: 'flex',
        justifyContent: 'space-between'
      }

    };
    const buttons = this.renderButtons(styles.wrapper);


    return (
      <div>
        {buttons}
        <textarea rows="4" cols="120" value={this.state.value} onChange={this.handleChange} />
        <div>
        <Button
          onClick={() => {this.onSubmit('SPORTS_TWEETS')}}
        >Tweet about Sports</Button>
          <Button
            onClick={() => {this.onSubmit('TECH_TWEETS')}}
          >Tweet about Tech</Button>
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