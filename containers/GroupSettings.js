import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/function/debounce';

import Content from './Content';
import TopBar from '../components/TopBar'
import Notification from '../components/Notification';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';

import resetNotifications from '../actions/notification/reset';
import notify from '../actions/notification/notify';
import fetchGroup from '../actions/groups/fetch_by_id';
import validateSettings from '../actions/form/validate_group_settings';
import appendGroupSettingsForm from '../actions/form/append_group_settings';
import updateGroup from '../actions/groups/update_group';
import uploadImage from '../actions/images/upload';

export class GroupSettings extends Component {
  render() {
    const {
        form
    } = this.props;

    return (
      <div className='GroupSettings'>
        <TopBar title='Collective Info' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            <ProfilePhotoUpload
              {...this.props}
              value={form.attributes.logo || this.props.group.logo}
              onFinished={({url}) => this.handleChange('logo', url)} />

            <div className='Label'> Name: </div>
            <Input
              type = 'text'
              placeholder = 'Group name'
              customClass=''
              value={form.attributes.name}
              handleChange= {this.handleChange.bind(this, 'name')}/>

            <div className='Label'> Short description: </div>
            <TextArea
              placeholder = 'Short description (in 140 characters or less)'
              rows='3'
              value={form.attributes.description}
              customClass='test1'
              handleChange= {this.handleChange.bind(this, 'description')}/>

            <div className='Label'> Long description: </div>
            <TextArea
              placeholder = 'Detailed description'
              rows='5'
              value={form.attributes.longDescription}
              customClass='test2'
              handleChange= {this.handleChange.bind(this, 'longDescription')}/>

            <div className='Label'> Expense Policy: </div>
            <TextArea
              placeholder = 'Optional -- specify what can be expensed by the members of the collective'
              rows='3'
              value={form.attributes.expensePolicy}
              handleChange= {this.handleChange.bind(this, 'expensePolicy')}/>

          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.groupid)
    .then(() => this.props.appendGroupSettingsForm({
      name: this.props.group.name,
      description: this.props.group.description,
      longDescription: this.props.group.longDescription,
      expensePolicy: this.props.group.expensePolicy,
      isPublic: this.props.group.isPublic
    }));

    this.debouncedValidateAndUpdateSetting = debounce(this.validateAndUpdateSetting, 500);
  }

  validateAndUpdateSetting(attribute){
    const {
      validateSettings,
      notify,
      groupid,
      updateGroup
    } = this.props;

    return validateSettings(attribute)
      .then(() => updateGroup(groupid, attribute))
      .catch(({message}) => notify('error', message));
  }

  handleChange(field, value){
    const attribute = {
      [field]: value
    };
    this.props.appendGroupSettingsForm(attribute);
    this.debouncedValidateAndUpdateSetting(attribute);
  }
}

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup,
  validateSettings,
  appendGroupSettingsForm,
  notify,
  updateGroup,
  uploadImage,
})(GroupSettings)

function mapStateToProps({groups, router, form, notification}){
  const groupid = router.params.groupid;
  const group = groups[groupid] || {};

  return {
    groupid,
    group,
    notification,
    form: form.groupSettings,
  }
}