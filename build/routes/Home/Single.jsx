import React from 'react';
import { Link } from 'react-router';

import datePrettifier from '../../helpers/datePrettifier';

import styles from './style.pcss';

const Single = props => (
  <section className={styles.tweet}>
    <Link className={styles.profile} to={props.tweet.user.id_str}>
      <img
        src={props.tweet.user.profile_image_url}
        alt={props.tweet.user.name}
        className={styles.picture}
      />
    </Link>
    <div className={styles.content}>
      <Link className={styles.name} to={`/profile/${props.tweet.user.id_str}`}>
        <span className={styles.username}>{props.tweet.user.name}</span>
        <span className={styles.screenname}>@{props.tweet.user.screen_name}</span>
      </Link>
      <Link className={styles.specific} to={`/tweet/${props.tweet.id_str}`}>
        {datePrettifier(props.tweet.created_at, 'completeshort', 'Asia/Jakarta')}
      </Link>
      <Link to={`/tweet/${props.tweet.id_str}`} className={styles.text}>
        {props.tweet.text}
      </Link>
      <div className={styles.actions}>
        <span className={styles.retweet}>{props.tweet.retweet_count} retweets</span>
        <span className={styles.favorited}>
          {props.tweet.favorited ? 'Favorited!' : 'Not a favorite' }
        </span>
      </div>
    </div>
  </section>
);

Single.propTypes = {
  tweet: React.PropTypes.shape({
    created_at: React.PropTypes.string,
    id_str: React.PropTypes.string,
    text: React.PropTypes.string,
    user: React.PropTypes.object,
    favorited: React.PropTypes.bool,
    retweet_count: React.PropTypes.number,
  }),
};

export default Single;
