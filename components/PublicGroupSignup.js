import React, { Component } from 'react';

import Input from '../components/Input';
import SaveButton from '../components/SaveButton';


export class PublicGroupSignup extends Component {
  render() {
    const {
      profileForm,
      saveInProgress
    } = this.props;

    return (
      <div className='PublicGroupSignup'>
        <div>Thanks for the donation. How should we show you on the page? </div>

        <div className='Label'> Display Name: </div>
        <Input
          type = 'text'
          placeholder = 'Name'
          customClass=''
          value={profileForm.attributes.name}
          handleChange= {this.handleChange.bind(this, 'name')}/>

        <div className='Label'> URL: </div>
        <Input
          type = 'text'
          placeholder = 'Website'
          customClass=''
          value={profileForm.attributes.website}
          handleChange= {this.handleChange.bind(this, 'website')}/>

        <div className='Label'> Twitter: </div>
        <Input
          type = 'text'
          placeholder = 'twitterUser'
          customClass=''
          value={profileForm.attributes.twitterHandle}
          handleChange= {this.handleChange.bind(this, 'twitterHandle')}/>
        <div>
          <SaveButton
            save={save.bind(this)}
            inProgress={saveInProgress} />
        </div>

      </div>
    );
  }

  handleChange(field, value){
      const attribute = {
        [field]: value
      };
      this.props.appendProfileForm(attribute);
  }
}

export function save() {
    const {
      users,
      updateUser,
      profileForm,
      validateDonationProfile,
      notify,
      pushState,
      groupid
    } = this.props;

    return validateDonationProfile(profileForm.attributes)
    .then(() => updateUser(users.user.id, profileForm.attributes))
    .then(() => pushState(null, `/public/groups/${groupid}/?status=thankyou`))
    .catch(({message}) => notify('error', message));
  };


export default PublicGroupSignup;