import 'whatwg-fetch';
import { createSelector } from 'reselect';

export const POST_TWEET_SUCCESS = 'POST_TWEET_SUCCESS';
export const POST_TWEET_FAILED = 'POST_TWEET_FAILED';

export default status => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/tweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const text = await response.text();
    const json = await JSON.parse(text);

    if (json.message) {
      dispatch({ type: POST_TWEET_SUCCESS, payload: json.message, errorMessage: '' });
    } else {
      dispatch({ type: POST_TWEET_FAILED, errorMessage: json.error_message });
    }
  } catch (e) {
    const text = await e.text();
    dispatch({ type: POST_TWEET_FAILED, errorMessage: text });
  }
};

export const postTweetReducer = (state = {
  type: '',
  payload: '',
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case POST_TWEET_SUCCESS:
      return {
        type: action.type,
        payload: action.payload,
        errorMessage: '',
      };
    case POST_TWEET_FAILED:
      return {
        type: action.type,
        payload: '',
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const postTweetPayload = state => state.payload;

export const postTweetSelector = createSelector(
  [postTweetPayload],
  announcementsPayload => announcementsPayload,
);
