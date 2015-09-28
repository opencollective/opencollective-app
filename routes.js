import App from './containers/App';
import GroupsList from './containers/GroupsList';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'groups', component: GroupsList }
  ]
};

export default routes;
