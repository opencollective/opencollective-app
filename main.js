import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ReduxRouter } from 'redux-router';
import App from './containers/App';
import createStore from './store/create';
import routes from './routes';

const container = document.querySelector('#content');
const store = createStore();

render(
  <Provider store={store}>
    <ReduxRouter />
  </Provider>,
  container
);
