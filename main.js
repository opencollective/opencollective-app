import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './containers/App';
import createStore from './store/create';
import routes from './routes';

const container = document.querySelector('#content');
const store = createStore();
let history = createBrowserHistory();

React.render(
  <Provider store={store}>
    {() => <Router history={history}>{routes}</Router>}
  </Provider>,
  container
);
