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
    { path: 'app/login', component: Login },

    { path: 'app/forgot', component: ForgotPassword },
    { path: 'app/reset/:usertoken/:resettoken', component: ResetPassword },

    // Private routes (app)
    { path: 'app', component: requireAuthentication(GroupsList) },
    { path: 'app/', component: requireAuthentication(GroupsList) },
    { path: 'app/profile', component: requireAuthentication(Profile) },
    { path: 'app/groups/:groupid/settings', component:requireAuthentication(GroupSettings)},
    { path: 'app/groups/:groupid/transactions', component: requireAuthentication(GroupTransactions)},
    { path: 'app/groups/:groupid/transactions/new', component: requireAuthentication(TransactionNew) },
    { path: 'app/groups/:groupid/transactions/:transactionid', component: requireAuthentication(TransactionDetail) },
    { path: 'app/groups/:groupid/transactions/:transactionid/edit', component: requireAuthentication(TransactionEdit) },
    { path: 'app/groups/:groupid/funds', component: requireAuthentication(AddFund)},

    // Wildcard route
    { path: 'app/*', component: Login }
  ]
};

export default routes;
