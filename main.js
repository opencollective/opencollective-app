import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './reducers/index';
import App from './containers/App';

const combinedReducers = combineReducers(reducers);
const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

let store = createStoreWithMiddleware(combinedReducers);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>
  , document.querySelector('#content')
);
