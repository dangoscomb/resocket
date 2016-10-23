import React from 'react';
import {render} from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './css/index.css';

const store = configureStore();
const app = document.getElementById('root');

render(<Provider store={store}>
  <Router history={browserHistory} routes={routes}  />
</Provider>, app);
