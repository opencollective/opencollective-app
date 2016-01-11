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
  PublicTransactions,
  PublicTransaction,
  GroupSettings
} from '../containers';

import { requireAuthentication } from '../components/AuthenticatedComponent';

const routes = {
  component: App,
  childRoutes: [
    { path: 'login', component: Login },

    { path: 'yeoman', component: PublicGroup },

    // Public routes (web)
    { path: 'public/groups/:groupid', component: PublicGroup },
    { path: 'public/groups/:groupid/transactions', component: PublicTransactions },
    { path: 'public/groups/:groupid/transactions/:transactionid', component: PublicTransaction },

    // Private routes (app)
    { path: '/', component: requireAuthentication(GroupsList) },
    { path: 'profile', component: requireAuthentication(Profile) },
    { path: 'groups/:groupid/settings', component:requireAuthentication(GroupSettings)},
    { path: 'groups/:groupid/transactions', component: requireAuthentication(GroupTransactions)},
    { path: 'groups/:groupid/transactions/new', component: requireAuthentication(TransactionNew) },
    { path: 'groups/:groupid/transactions/:transactionid', component: requireAuthentication(TransactionDetail) },
    { path: 'groups/:groupid/donation', component: requireAuthentication(Donation)},
    { path: 'groups/:groupid/donation/method', component: requireAuthentication(DonationMethod)},

    // Wildcard route
    { path: '*', component: Login }
  ]
};

export default routes;
