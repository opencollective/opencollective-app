import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import createStore from './store/create';
import { Router, Route, Link } from 'react-router';
import routes from './routes';

let store = createStore();
const container = document.querySelector('#content');

React.render(
  <Provider store={store}>
    {() => <Router routes={routes} />}
  </Provider>,
  container
);
