import App from './containers/App';
import GroupsList from './containers/GroupsList';
import GroupTransactions from './containers/GroupTransactions';
import DonationMethod from './containers/DonationMethod';
import Donation from './containers/Donation';
import TransactionNew from './containers/TransactionNew';
import TransactionDetail from './containers/TransactionDetail';
import Login from './containers/Login';
import Profile from './containers/Profile';
import PublicGroup from './containers/PublicGroup';
import InviteToGroup from './containers/InviteToGroup';

const routes = {
  component: App,
  childRoutes: [
    { path: '/', component: GroupsList },
    { path: 'login', component: Login },
    { path: 'profile', component: Profile },
    { path: 'groups/:groupid/transactions', component: GroupTransactions},
    { path: 'groups/:groupid/donation', component: Donation},
    { path: 'groups/:groupid/donation/method', component: DonationMethod},
    { path: 'groups/:groupid/transactions/new', component: TransactionNew },
    { path: 'groups/:groupid/transactions/:transactionid', component: TransactionDetail },
    { path: 'public/groups/:groupid', component: PublicGroup },
    { path: 'groups/:groupid/invite', component: InviteToGroup },
    { path: '*', component: Login }
  ]
};

export default routes;
