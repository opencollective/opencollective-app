import React, { Component } from 'react';
import Joi from 'joi';

import Input from '../components/Input';
import SaveButton from '../components/SaveButton';

export class PublicGroupSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.schema = Joi.alternatives().try(
      Joi.object().keys({
        name: Joi.string().required().label('Name'),
        website: Joi.string().uri().allow('').label('Website'),
        twitterHandle: Joi.string().allow('').label('Twitter username')
      }),
      Joi.object().keys({
        name: Joi.string().allow('').label('Name'),
        website: Joi.string().uri().allow('').label('Website'),
        twitterHandle: Joi.string().required().label('Twitter username')
      })
    );
  }

  render() {
    const {
      saveInProgress,
      donator
    } = this.props;

    return (
      <div className='PublicGroupSignup'>
        <h2>Thanks for the donation </h2>

        <p> How should we show you on the page? </p>

        <div className='Label'>Display Name: </div>
        <Input
          type='text'
          placeholder='Name'
          value={this.state.name || donator.name}
          handleChange={(name) => this.setState({name})}/>

        <div className='Label'>URL: </div>
        <Input
          type='text'
          placeholder='Website'
          value={this.state.website || donator.website}
          handleChange={(website) => this.setState({website})}/>

        <div className='Label'>Twitter: </div>
        <Input
          type='text'
          placeholder='twitterUser'
          value={this.state.twitterHandle || donator.twitterHandle}
          handleChange={(twitterHandle) => this.setState({twitterHandle})}/>
        <div>
          <SaveButton
            save={save.bind(this)}
            inProgress={saveInProgress} />
        </div>

      </div>
    );
  }

}

export function save() {
  const {
    donator,
    updateUser,
    notify,
    pushState,
    groupid,
    slug,
    validate,
    hideAdditionalUserInfoForm,
    fetchUsers
  } = this.props;

  return validate(this.state, this.schema)
    .then(() => updateUser(donator.id, this.state))
    .then(() => hideAdditionalUserInfoForm())
    .then(() => fetchUsers(groupid))
    .then(() => pushState(null, `/${slug}?status=thankyou`))
    .catch(({message}) => notify('error', message));
};


export default PublicGroupSignup;