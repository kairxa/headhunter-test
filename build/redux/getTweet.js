import 'whatwg-fetch';
import { createSelector } from 'reselect';

export const GET_TWEET_SUCCESS = 'GET_TWEET_SUCCESS';
export const GET_TWEET_FAILED = 'GET_TWEET_FAILED';

export default tweetId => async (dispatch) => {
  try {
    const url = `http://localhost:3000/single/${tweetId}`;

    const response = await fetch(url, {
      method: 'GET',
    });
    const text = await response.text();
    const json = await JSON.parse(text);
    if (json.message) {
      dispatch({ type: GET_TWEET_SUCCESS, payload: json.message, errorMessage: '' });
    } else {
      dispatch({
        type: GET_TWEET_FAILED,
        payload: {},
        errorMessage: 'Error shits',
      });
    }
  } catch (e) {
    const text = await e.text();
    dispatch({ type: GET_TWEET_FAILED, payload: {}, errorMessage: text });
  }
};

export const getTweetReducer = (state = {
  type: '',
  payload: {},
  errorMessage: '',
  showDummy: false,
}, action) => {
  switch (action.type) {
    case GET_TWEET_SUCCESS:
      return {
        type: action.type,
        payload: action.payload,
        errorMessage: '',
        showDummy: false,
      };
    case GET_TWEET_FAILED:
      return {
        type: action.type,
        payload: {},
        errorMessage: action.errorMessage,
        showDummy: false,
      };
    default:
      return state;
  }
};

const getTweetPayload = state => state.payload;

export const getTweetSelector = createSelector(
  [getTweetPayload],
  tweetPayload => tweetPayload,
);
