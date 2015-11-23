import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

const PopOverMenu = ({showPopOverMenu, groupid, hasPopOverMenuOpen}) => {
  const className = classnames({
    'PopOverMenu': true,
    'PopOverMenu--open': hasPopOverMenuOpen
  });

  return (
    <div className={className}>
      <div className='PopOverMenu-group'>
        <div className='PopOverMenu-item'>
          <Link to={`/groups/${groupid}/donation/`}>
            Add funds
          </Link>
        </div>
        <div className='PopOverMenu-item'>
          <Link to={`/groups/${groupid}/transactions/new`}>
            Add expense
          </Link>
        </div>
      </div>

      <div
        className='PopOverMenu-cancel'
        onClick={() => showPopOverMenu(false)}>
        Cancel
      </div>
    </div>
  );
};

PopOverMenu.propTypes = {
  showPopOverMenu: PropTypes.func.isRequired
};

export default PopOverMenu;
