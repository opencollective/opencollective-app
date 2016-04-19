import React, { Component } from 'react';
import { connect } from 'react-redux';
import Joi from 'joi';
import debounce from 'lodash/function/debounce';
import pick from 'lodash/object/pick';

import Content from './Content';
import TopBar from '../components/TopBar'
import Notification from '../components/Notification';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';

import resetNotifications from '../actions/notification/reset';
import notify from '../actions/notification/notify';
import fetchGroup from '../actions/groups/fetch_by_id';
import validate from '../actions/form/validate_schema';
import updateGroup from '../actions/groups/update_group';
import uploadImage from '../actions/images/upload';

export class GroupSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.schema = Joi.object().keys({
      name: Joi.string(),
      description: Joi.string().max(95),
      longDescription: Joi.string(),
      logo: Joi.string().uri(),
      image: Joi.string().uri(),
      expensePolicy: Joi.string()
    });
  }

  render() {
    const {
      error,
      updated
    } = this.props;

    return (
      <div className='GroupSettings'>
        <TopBar title='Collective Info' hasBackButton={true} />
        <Content>
          <Notification {...this.props} />
          <div className='padded'>
            <ProfilePhotoUpload
              {...this.props}
              value={this.state.logo || this.props.group.logo}
              onFinished={({url}) => this.handleChange({logo: url})} />

            <div className='Label'> Name: </div>
            <Input
              type='text'
              placeholder='Group name'
              value={this.state.name}
              hasError={error.name}
              isSuccessful={updated.name}
              handleChange={name => this.handleChange({name})}/>

            <div className='Label'> Short description: </div>
            <TextArea
              placeholder='Short description (in 140 characters or less)'
              rows='3'
              value={this.state.description}
              isSuccessful={updated.description}
              handleChange={description => this.handleChange({description})}/>

            <div className='Label'> Long description: </div>
            <TextArea
              placeholder='Detailed description'
              rows='5'
              value={this.state.longDescription}
              isSuccessful={updated.longDescription}
              handleChange={longDescription => this.handleChange({longDescription})}/>

            <div className='Label'> Expense Policy: </div>
            <TextArea
              placeholder='Optional -- specify what can be expensed by the members of the collective'
              rows='3'
              value={this.state.expensePolicy}
              isSuccessful={updated.expensePolicy}
              handleChange= {expensePolicy => this.handleChange({expensePolicy})}/>
          </div>
        </Content>
      </div>
    );
  }

  componentWillMount() {
    this.debounceUpdateSettings = debounce(this.updateSettings, 500);

    this.props.fetchGroup(this.props.groupid)
      .then(() => this.setState(this.props.initialGroup));

  }

  updateSettings(attribute){
    const {
      validate,
      notify,
      groupid,
      updateGroup
    } = this.props;

    return validate(attribute, this.schema)
      .then(() => updateGroup(groupid, attribute))
      .catch(({message}) => notify('error', message));
  }

  handleChange(attribute){
    this.setState(attribute);
    this.debounceUpdateSettings(attribute);
  }
}

export default connect(mapStateToProps, {
  resetNotifications,
  fetchGroup,
  validate,
  notify,
  updateGroup,
  uploadImage,
})(GroupSettings)

function mapStateToProps({groups, router, form, notification}){
  const groupid = router.params.groupid;
  const group = groups[groupid] || {};
  const initialGroup = pick(group, [
    'name',
    'description',
    'longDescription',
    'expensePolicy',
    'isPublic'
  ]);

  return {
    groupid,
    initialGroup,
    group,
    notification,
    error: form.schema.error,
    updated: groups.updated,
  }
}