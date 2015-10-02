import App from './containers/App';
import GroupsListConnector from './containers/GroupsListConnector';
import GroupTransactionsConnector from './containers/GroupTransactionsConnector';
import TransactionNewConnector from './containers/TransactionNewConnector';
import TransactionDetailConnector from './containers/TransactionDetailConnector';
import LoginConnector from './containers/LoginConnector';

const routes = {
  component: App,
  childRoutes: [
    { path: '/', component: GroupsListConnector },
    { path: 'login', component: LoginConnector },
    { path: 'groups/:groupid/transactions', component: GroupTransactionsConnector},
    { path: 'groups/:groupid/transactions/new', component: TransactionNewConnector },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetailConnector }
  ]
};

export default routes;
