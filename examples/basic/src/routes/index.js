import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from '../core/Layout';
import Tweets from '../tweets/Tweets.container';

const routes = (
  <Route path="/">
    <Route component={Layout}>
      <IndexRoute component={Tweets} />
      <Route component={Tweets} />
    </Route>
  </Route>
);

export default routes;