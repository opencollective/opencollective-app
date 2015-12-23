import {
  App,
  GroupsList,
  GroupTransactions,
  DonationMethod,
  Donation,
  TransactionNew,
  TransactionDetail,
  Login,
  Profile,
  PublicGroup,
  PublicTransactions
} from '../containers';

import { requireAuthentication } from '../components/AuthenticatedComponent';

const routes = {
  component: App,
  childRoutes: [

    // Public routes
    { path: 'login', component: Login },
    { path: 'public/groups/:groupid', component: PublicGroup },
    { path: 'public/groups/:groupid/transactions', component: PublicTransactions },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetail },
    { path: 'groups/:groupid/transactions', component: GroupTransactions},

    // Private routes
    { path: '/', component: requireAuthentication(GroupsList) },
    { path: 'profile', component: requireAuthentication(Profile) },
    { path: 'groups/:groupid/transactions', component: requireAuthentication(GroupTransactions)},
    { path: 'groups/:groupid/donation', component: requireAuthentication(Donation)},
    { path: 'groups/:groupid/donation/method', component: requireAuthentication(DonationMethod)},
    { path: 'groups/:groupid/transactions/new', component: requireAuthentication(TransactionNew) },

    // Wildcard route
    { path: '*', component: Login }
  ]
};

export default routes;
