import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';

import showPopOverMenu from '../actions/session/show_popovermenu';
import isAdmin from '../lib/is_admin';

import Content from './Content';
import Header from '../components/Header';
import Footer from '../components/Footer';

import fetchGroups from '../actions/users/fetch_groups';

class InviteToGroup extends Component {
  render() {
    const {
      group,
    } = this.props;

    return (
      <div>
        <Header
          title={`Add a member to ${group.name}`}
          backLink='/' />
        <Content {...this.props} >
          
          
        </Content>
        <Footer {...this.props} />
      </div>
    );
  }

  componentDidMount() {
    const {
      fetchGroups,
      groupid,
      userid,
      showPopOverMenu
    } = this.props;
    
    showPopOverMenu(false);

    fetchGroups(userid)
    .then((result) => console.log(result));
  }

}

export default connect(mapStateToProps, {
  fetchGroups,
  showPopOverMenu
})(InviteToGroup);

function mapStateToProps({router, session, users}) {
  const groupid = router.params.groupid;
  const userid = session.user.id;
  const user = users[userid] || {};
  const groups = user.groups || {};
  const userIsAdmin = isAdmin([groups[groupid]]);
  
  return {
    email: session.user.email,
    groupid,
    group: groups[groupid] || {},
    isLoading: !groupid,
    userid,
    hasPopOverMenuOpen: session.hasPopOverMenuOpen,
    userIsAdmin
  };
}