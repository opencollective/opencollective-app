import App from './containers/App';
import GroupsListConnector from './containers/GroupsListConnector';
import GroupTransactionsConnector from './containers/GroupTransactionsConnector';
import TransactionNew from './containers/TransactionNew';
import TransactionDetailConnector from './containers/TransactionDetailConnector';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'groups', component: GroupsListConnector },
    { path: 'groups/:groupid/transactions', component: GroupTransactionsConnector},
    { path: 'groups/:groupid/transactions/new', component: TransactionNew },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetailConnector }
  ]
};

export default routes;
