import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ReduxRouter } from 'redux-router';
import App from './src/containers/App';
import createStore from './src/store/create';
import routes from './routes';

const container = document.querySelector('#content');
const store = createStore();

render(
  <Provider store={store}>
    <ReduxRouter />
  </Provider>,
  container
);
