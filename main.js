import React from 'react';
import { Router, Route, Link } from 'react-router';
import routes from './routes';

React.render(<Router routes={routes} />, document.querySelector('#content'))
