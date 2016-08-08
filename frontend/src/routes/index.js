import {
  App,
  GroupsList,
  GroupTransactions,
  AddFund,
  ExpenseDetail,
  TransactionDetail,
  Login,
  Profile,
  GroupSettings,
  ExpenseEdit,
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
    { path: 'groups/:groupid/settings', component:requireAuthentication(GroupSettings) },
    { path: 'groups/:groupid/expenses/:expenseid', component: requireAuthentication(ExpenseDetail) },
    { path: 'groups/:groupid/expenses/:expenseid/edit', component: requireAuthentication(ExpenseEdit) },
    { path: 'groups/:groupid/transactions', component: requireAuthentication(GroupTransactions) },
    { path: 'groups/:groupid/transactions/:transactionid', component: requireAuthentication(TransactionDetail) },
    { path: 'groups/:groupid/funds', component: requireAuthentication(AddFund)},

    // Wildcard route
    { path: '*', component: requireAuthentication(GroupsList) }
  ]
};

export default routes;
