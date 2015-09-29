import App from './containers/App';
import GroupsListConnector from './containers/GroupsListConnector';
import GroupTransactionsConnector from './containers/GroupTransactionsConnector';
import TransactionNew from './containers/TransactionNew';
import TransactionDetail from './containers/TransactionDetail';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'groups', component: GroupsListConnector },
    { path: 'groups/:groupid/transactions', component: GroupTransactionsConnector},
    { path: 'groups/:groupid/transactions/new', component: TransactionNew },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetail }
  ]
};

export default routes;
