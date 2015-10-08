import App from './containers/App';
import GroupsList from './containers/GroupsList';
import GroupTransactions from './containers/GroupTransactions';
import TransactionNew from './containers/TransactionNew';
import TransactionDetail from './containers/TransactionDetail';
import Login from './containers/Login';

const routes = {
  component: App,
  childRoutes: [
    { path: '/', component: GroupsList },
    { path: 'login', component: Login },
    { path: 'groups/:groupid/transactions', component: GroupTransactions},
    { path: 'groups/:groupid/transactions/new', component: TransactionNew },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetail }
  ]
};

export default routes;
