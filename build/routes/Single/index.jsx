import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import deleteTweetAction, { deleteTweetSelector } from '../../redux/deleteTweet';
import getTweetAction, { getTweetSelector } from '../../redux/getTweet';

import styles from './style.pcss';

const mapStateToProps = state => ({
  delete: deleteTweetSelector(state.deleteTweet),
  tweet: getTweetSelector(state.getTweet),
});

class Single extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteAction = this.handleDeleteAction.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getTweetAction(this.props.params.id));
  }

  handleDeleteAction() {
    this.props.dispatch(deleteTweetAction(this.props.params.id));
  }

  render() {
    if (!this.props.tweet.id_str) return (<section />);

    return (
      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.title}>A Tweet</span>
          <Link to="/" className={styles.link}>Back</Link>
        </header>
        <section className={styles.tweet}>
          <Link className={styles.profile} to={this.props.tweet.user.id_str}>
            <img
              src={this.props.tweet.user.profile_image_url}
              alt={this.props.tweet.user.name}
              className={styles.picture}
            />
          </Link>
          <div className={styles.content}>
            <Link className={styles.name} to={`/profile/${this.props.tweet.user.id_str}`}>
              <span className={styles.username}>{this.props.tweet.user.name}</span>
              <span className={styles.screenname}>{this.props.tweet.user.screen_name}</span>
            </Link>
            <Link className={styles.specific} to={`/tweet/${this.props.tweet.id_str}`}>
              {this.props.tweet.created_at}
            </Link>
            <div className={styles.text}>
              {this.props.tweet.text}
            </div>
            <div className={styles.actions}>
              <span className={styles.retweet}>{this.props.tweet.retweet_count} retweets</span>
              <span className={styles.favorited}>
                {this.props.tweet.favorited ? 'Favorited!' : 'Not a favorite' }
              </span>
              <button className={styles.delete} onClick={this.handleDeleteAction}>
                Delete
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

Single.propTypes = {
  dispatch: React.PropTypes.func,
  tweet: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    id_str: React.PropTypes.string,
    text: React.PropTypes.string,
    user: React.PropTypes.object,
    favorited: React.PropTypes.bool,
    retweet_count: React.PropTypes.number,
  }),
};

export default connect(mapStateToProps)(Single);
