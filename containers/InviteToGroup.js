import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';

import showPopOverMenu from '../actions/session/show_popovermenu';
import isAdmin from '../lib/is_admin';

import Content from './Content';
import Header from '../components/Header';
import Footer from '../components/Footer';

import fetchGroup from '../actions/groups/fetch_by_id';

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
      fetchGroup,
      groupid,
      showPopOverMenu
    } = this.props;
    
    showPopOverMenu(false);

    fetchGroup(groupid)
    .then((result) => console.log(result));
  }

}

export default connect(mapStateToProps, {
  fetchGroup,
  showPopOverMenu
})(InviteToGroup);

function mapStateToProps({router, session, groups}) {
  const groupid = router.params.groupid;
  const group = groups[groupid] || {};
  const userIsAdmin = isAdmin([group]);
  
  return {
    email: session.user.email,
    groupid,
    group: groups[groupid] || {},
    isLoading: !groupid,
    hasPopOverMenuOpen: session.hasPopOverMenuOpen,
    userIsAdmin
  };
}