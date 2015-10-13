import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';

class Footer extends Component {
  propTypes: {
    groupid: PropTypes.string.isRequired
  }

  render() {
    const { groupid } = this.props;
    const url = `/groups/${groupid}/transactions/new`;

    return (
      <div className='Footer'>
        <div className='Footer-addButton'>
          <Link to={url}>
            <Icon type='add' />
          </Link>
        </div>
      </div>
    );
  }
}

export default Footer;
