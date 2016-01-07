import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/function/debounce';

import rejectError from '../lib/reject_error';

import Content from './Content';
import Header from '../components/Header'
import Notification from '../components/Notification';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import ImageUpload from '../components/ImageUpload';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';

import resetNotifications from '../actions/notification/reset';
import notify from '../actions/notification/notify';
import fetchGroup from '../actions/groups/fetch_by_id';
import validateAttribute from '../actions/form/validate_group_settings';
import appendGroupSettingsForm from '../actions/form/append_group_settings';
import updateGroup from '../actions/groups/update_group';
import uploadImage from '../actions/images/upload';

export class GroupSettings extends Component {
  render() {
    const {
        form,
        isUploadingLogo,
        isUploadingImage,
    } = this.props;
    return (
      <div className='GroupSettings'>
        <Header title='Collective Info' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded GroupSettings'>
            <div>
              <div className='leftColumn'>
                <div className='Label'> Name: </div>
                <Input
                  type = 'text'
                  placeholder = 'Group name'
                  value={form.attributes.name}
                  handleChange= {this.handleChange.bind(this, 'name')}/>
              </div>
              <ProfilePhotoUpload
                {...this.props}
                newUrl={form.attributes.logo}
                currentUrl={this.props.group.logo}
                tag='logo'
                isUploading={isUploadingLogo}
                  onFinished={({url}) => this.handleChange('logo', url)} />

            </div>

            <div className='Label'> Description: </div>
            <TextArea
              placeholder = 'Short description'
              rows='3'
              value={form.attributes.description}
              handleChange= {this.handleChange.bind(this, 'description')}/>

            <div className='Label'> Details: </div>
            <TextArea
              placeholder = 'Detailed description'
              rows='5'
              value={form.attributes.longDescription}
              handleChange= {this.handleChange.bind(this, 'longDescription')}/>

            <div className='Label'> Expense Policy: </div>
            <TextArea
              placeholder = 'Enter your expense policy'
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
          validateAttribute,
          notify,
          groupid,
          updateGroup
      } = this.props;

    return validateAttribute(attribute)
      .then(rejectError.bind(this, 'validationError'))
      .then(() => updateGroup(groupid, attribute))
      .then(rejectError.bind(this, 'serverError'))
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
    validateAttribute,
    appendGroupSettingsForm,
    notify,
    updateGroup,
    uploadImage,
})(GroupSettings)

function mapStateToProps({groups, router, form, notification, images}){
    const groupid = router.params.groupid;
    const group = groups[groupid] || {};
    return {
        groupid,
        group,
        form1: form,
        notification,
        isUploadingLogo: (images.isUploading && images.tag==='logo') || false,
        isUploadingImage: (images.isUploading && images.tag==='image') || false,
        form: form.groupSettings,
    }
}