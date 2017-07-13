/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './redux/reducers';

import Routes from './routes';

require('offline-plugin/runtime').install();

const configureStore = preloadedState => (
  createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(
        thunkMiddleware,
      ),
    )
  )
);

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>,
  document.querySelector('#headhunter')
);
