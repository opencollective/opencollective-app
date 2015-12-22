import App from '../containers/App';
import GroupsList from '../containers/GroupsList';
import GroupTransactions from '../containers/GroupTransactions';
import DonationMethod from '../containers/DonationMethod';
import Donation from '../containers/Donation';
import TransactionNew from '../containers/TransactionNew';
import TransactionDetail from '../containers/TransactionDetail';
import Login from '../containers/Login';
import Profile from '../containers/Profile';
import PublicGroup from '../containers/PublicGroup';
import { requireAuthentication } from '../components/AuthenticatedComponent';


const routes = {
  component: App,
  childRoutes: [

    // Public routes
    { path: '/', component: requireAuthentication(GroupsList) },
    { path: 'login', component: Login },
    { path: 'public/groups/:groupid', component: PublicGroup },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetail },

    // Private routes
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
