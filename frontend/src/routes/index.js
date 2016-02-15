import {
  App,
  GroupsList,
  GroupTransactions,
  AddFund,
  TransactionNew,
  TransactionDetail,
  Login,
  Profile,
  GroupSettings,
  TransactionEdit,
  ForgotPassword,
  ResetPassword
} from '../containers';

import { requireAuthentication } from '../components/AuthenticatedComponent';

const routes = {
  component: App,
  childRoutes: [
    { path: 'login', component: Login },

    { path: 'forgot', component: ForgotPassword },
    { path: 'reset/:usertoken/:resettoken', component: ResetPassword },

    { path: '/', component: requireAuthentication(GroupsList) },
    { path: 'profile', component: requireAuthentication(Profile) },
    { path: 'groups/:groupid/settings', component:requireAuthentication(GroupSettings)},
    { path: 'groups/:groupid/transactions', component: requireAuthentication(GroupTransactions)},
    { path: 'groups/:groupid/transactions/new', component: requireAuthentication(TransactionNew) },
    { path: 'groups/:groupid/transactions/:transactionid', component: requireAuthentication(TransactionDetail) },
    { path: 'groups/:groupid/transactions/:transactionid/edit', component: requireAuthentication(TransactionEdit) },
    { path: 'groups/:groupid/funds', component: requireAuthentication(AddFund)},

    // Wildcard route
    { path: '*', component: requireAuthentication(GroupsList) }
  ]
};

export default routes;
