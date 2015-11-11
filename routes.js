import App from './src/containers/App';
import GroupsList from './src/containers/GroupsList';
import GroupTransactions from './src/containers/GroupTransactions';
import TransactionNew from './src/containers/TransactionNew';
import TransactionDetail from './src/containers/TransactionDetail';
import Login from './src/containers/Login';
import Profile from './src/containers/Profile';

const routes = {
  component: App,
  childRoutes: [
    { path: '/', component: GroupsList },
    { path: 'login', component: Login },
    { path: 'profile', component: Profile },
    { path: 'groups/:groupid/transactions', component: GroupTransactions},
    { path: 'groups/:groupid/transactions/new', component: TransactionNew },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetail },
    { path: '*', component: Login }
  ]
};

export default routes;
