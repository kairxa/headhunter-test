import 'whatwg-fetch';
import { createSelector } from 'reselect';

export const DELETE_TWEET_SUCCESS = 'DELETE_TWEET_SUCCESS';
export const DELETE_TWEET_FAILED = 'DELETE_TWEET_FAILED';

export default tweetId => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweetId }),
    });
    const text = await response.text();
    const json = await JSON.parse(text);

    if (json.message) {
      dispatch({ type: DELETE_TWEET_SUCCESS, payload: json.message, errorMessage: '' });
    } else {
      dispatch({ type: DELETE_TWEET_FAILED, errorMessage: json.error_message });
    }
  } catch (e) {
    const text = await e.text();
    dispatch({ type: DELETE_TWEET_FAILED, errorMessage: text });
  }
};

export const deleteTweetReducer = (state = {
  type: '',
  payload: '',
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case DELETE_TWEET_SUCCESS:
      return {
        type: action.type,
        payload: action.payload,
        errorMessage: '',
      };
    case DELETE_TWEET_FAILED:
      return {
        type: action.type,
        payload: '',
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const deleteTweetPayload = state => state.payload;

export const deleteTweetSelector = createSelector(
  [deleteTweetPayload],
  announcementsPayload => announcementsPayload,
);
