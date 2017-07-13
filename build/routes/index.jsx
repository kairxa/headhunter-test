import React from 'react';
import { Route, IndexRoute } from 'react-router';

const HeadHunter = props => (
  <main>
    {props.children}
  </main>
);

HeadHunter.propTypes = {
  children: React.PropTypes.node,
};

const Routes = (
  <Route path="/" component={HeadHunter}>
    <IndexRoute
      getComponents={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, {
            children: require('./Home').default,
          });
        });
      }}
    />
    <Route
      path="tweet"
      getComponents={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, {
            children: require('./Tweet').default,
          });
        });
      }}
    />
    <Route
      path="tweet/:id"
      getComponents={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, {
            children: require('./Single').default,
          });
        });
      }}
    />
  </Route>
);

export default Routes;
