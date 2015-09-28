import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import initStore from './lib/initStore';

let store = initStore();

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>
  , document.querySelector('#content')
);
