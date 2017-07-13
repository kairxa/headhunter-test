import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import getHomeTimelineAction, { getHomeTimelineSelector } from '../../redux/getHomeTimeline';

import Tweet from './Single';

import styles from './style.pcss';

const mapStateToProps = state => ({
  timeline: getHomeTimelineSelector(state.getHomeTimeline),
});

class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch(getHomeTimelineAction());
  }

  render() {
    return (
      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.title}>Timeline</span>
          <Link to="/tweet" className={styles.link}>Tweet</Link>
        </header>
        <section className={styles.timeline}>
          { this.props.timeline &&
            this.props.timeline.map((tweet, key) => (
              <Tweet tweet={tweet} key={key} />
            ))
          }
        </section>
      </main>
    );
  }
}

Home.propTypes = {
  dispatch: React.PropTypes.func,
  timeline: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default connect(mapStateToProps)(Home);
