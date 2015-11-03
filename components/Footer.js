import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';

const Footer = ({groupid}) => {
  return (
    <div className='Footer'>
      <div className='Footer-addButton'>
        <Link to={`/groups/${groupid}/transactions/new`}>
          <Icon type='add' />
        </Link>
      </div>
    </div>
  );
}

Footer.propTypes = {
  groupid: PropTypes.string.isRequired
};

export default Footer;
