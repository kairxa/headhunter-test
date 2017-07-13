import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import postTweetAction, { postTweetSelector } from '../../redux/postTweet';

import styles from './style.pcss';

const mapStateToProps = state => ({
  postTweet: postTweetSelector(state.postTweet),
});

class Tweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: '',
    };

    this.handlePostAction = this.handlePostAction.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handlePostAction() {
    this.props.dispatch(postTweetAction(this.state.tweet));
  }

  handleTextChange(event) { // should use react-form in complex thing but eh
    this.setState({
      tweet: event.target.value, // who needs trim :^)
    });
  }

  render() {
    return (
      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.title}>New Tweet</span>
          <Link to="/" className={styles.link}>Back</Link>
        </header>
        <section className={styles.new}>
          <textarea
            className={styles.text}
            placeholder="New Tweet"
            value={this.state.tweet}
            onChange={this.handleTextChange}
          />
          <button type="submit" className={styles.submit} onClick={this.handlePostAction}>
            POST
          </button>
        </section>
      </main>
    );
  }
}

Tweet.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(Tweet);
