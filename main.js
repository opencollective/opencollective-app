import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import initStore from './lib/initStore';
import { Router, Route, Link } from 'react-router';
import routes from './routes';

let store = initStore();

React.render(
  <Provider store={store}>
    {() => <Router routes={routes} />}
  </Provider>
  , document.querySelector('#content')
);
