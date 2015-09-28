import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './containers/App';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

let store = createStoreWithMiddleware(reducers);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>
  , document.querySelector('#content')
);
