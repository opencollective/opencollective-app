import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import App from './containers/App';
import createStore from './store/create';
import routes from './routes';

const container = document.querySelector('#content');
let store = createStore();

React.render(
  <Provider store={store}>
    {() => <Router routes={routes} />}
  </Provider>,
  container
);
