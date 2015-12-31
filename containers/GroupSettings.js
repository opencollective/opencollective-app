import React, { Component } from 'react';
import { connect } from 'react-redux';

import rejectError from '../lib/reject_error';

import Content from './Content';
import Header from '../components/Header'
import Notification from '../components/Notification';
import Input from '../components/Input';

import resetNotifications from '../actions/notification/reset';
import notify from '../actions/notification/notify';
import fetchGroup from '../actions/groups/fetch_by_id';
import validateAttribute from '../actions/form/validate_group_settings';
import appendGroupSettingsForm from '../actions/form/append_group_settings';
import updateGroup from '../actions/groups/update_group';

export class GroupSettings extends Component {
  render() {
    const {
        group,
        form
    } = this.props;
    return (
      <div className='GroupSettings'>
        <Header title='Settings' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            <Input
              labelText= 'Name'
              type = 'text'
              placeholder = 'Group name'
              value={form.attributes.name || group.name }
              handleChange= {this.handleChange.bind(this, 'name')}/>
            <Input
              labelText= 'Description'
              type = 'text'
              placeholder = 'Group name'
              maxLength='95'
              value={form.attributes.description || group.description }
              handleChange= {this.handleChange.bind(this, 'description')}/>
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.groupid);
  }

  handleChange(field, value){
      const {
          groupid,
          validateAttribute,
          notify,
          updateGroup
      } = this.props;

      var attribute = {};
      attribute[field]  = value;
      this.props.appendGroupSettingsForm(attribute)

      return validateAttribute(attribute)
      .then(rejectError.bind(this, 'validationError'))
      .then(() => updateGroup(groupid, attribute))
      .then(rejectError.bind(this, 'serverError'))
      .catch(({message}) => notify('error', message));
  }
}



export default connect(mapStateToProps, {
    resetNotifications,
    fetchGroup,
    validateAttribute,
    appendGroupSettingsForm,
    notify,
    updateGroup
})(GroupSettings)

function mapStateToProps({groups, router, form, notification, images}){
    const groupid = router.params.groupid;
    const group = groups[groupid] || {};

    return {
        groupid,
        group,
        notification,
        isUploading: images.isUploading || false,
        form: form.groupSettings,
    }
}