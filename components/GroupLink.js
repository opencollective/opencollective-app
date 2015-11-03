import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Currency from './Currency';
import Icon from './Icon';

const GroupLink = ({id, name, budget}) => {
  const url = `/groups/${id}/transactions/`;

  return (
    <div className='GroupLink'>
      <Link to={url}>
        <div className='Well'>
          <span className='Well-primary'>
            {name}
          </span>
          <span className='Well-right'>
            <Currency value={budget} /> <Icon type='right' />
          </span>
        </div>
      </Link>
    </div>
  );
}

GroupLink.propTypes = {
  id: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default GroupLink;
