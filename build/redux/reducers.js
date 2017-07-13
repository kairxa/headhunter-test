import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { getHomeTimelineReducer as getHomeTimeline } from './getHomeTimeline';
import { getTweetReducer as getTweet } from './getTweet';
import { postTweetReducer as postTweet } from './postTweet';
import { deleteTweetReducer as deleteTweet } from './deleteTweet';

export default combineReducers({
  form: formReducer,
  /* insert other reducers here */
  getHomeTimeline,
  getTweet,
  postTweet,
  deleteTweet,
  routing: routerReducer,
});
