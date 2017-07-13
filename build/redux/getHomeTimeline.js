import 'whatwg-fetch';
import { createSelector } from 'reselect';

export const GET_TIMELINE_SUCCESS = 'GET_TIMELINE_SUCCESS';
export const GET_TIMELINE_FAILED = 'GET_TIMELINE_FAILED';

export default () => async (dispatch) => {
  try {
    const url = 'http://localhost:3000/timeline';

    const response = await fetch(url, {
      method: 'GET',
    });
    const text = await response.text();
    const json = await JSON.parse(text);
    if (json.message) {
      dispatch({ type: GET_TIMELINE_SUCCESS, payload: json.message, errorMessage: '' });
    } else {
      dispatch({
        type: GET_TIMELINE_FAILED,
        payload: [],
        errorMessage: 'Error shits',
      });
    }
  } catch (e) {
    const text = await e.text();
    dispatch({ type: GET_TIMELINE_FAILED, payload: [], errorMessage: text });
  }
};

export const getHomeTimelineReducer = (state = {
  type: '',
  payload: [],
  errorMessage: '',
  showDummy: false,
}, action) => {
  switch (action.type) {
    case GET_TIMELINE_SUCCESS:
      return {
        type: action.type,
        payload: action.payload,
        errorMessage: '',
        showDummy: false,
      };
    case GET_TIMELINE_FAILED:
      return {
        type: action.type,
        payload: state.payload,
        errorMessage: action.errorMessage,
        showDummy: false,
      };
    default:
      return state;
  }
};

const getHomeTimelinePayload = state => state.payload;

export const getHomeTimelineSelector = createSelector(
  [getHomeTimelinePayload],
  timelinePayload => timelinePayload,
);
