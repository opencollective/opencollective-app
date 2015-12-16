import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

const PopOverMenu = ({showPopOverMenu, groupid, hasPopOverMenuOpen, userIsAdmin}) => {
  const className = classnames({
    'PopOverMenu': true,
    'PopOverMenu--open': hasPopOverMenuOpen,
  });
  
  function menuItem(link, label) {
    return (<div className='PopOverMenu-item'>
          <Link to={link}>
            {label}
          </Link>
        </div>);
  }

  return (
    <div className={className}>
      <div className='PopOverMenu-group'>
        {userIsAdmin ? menuItem(`/groups/${groupid}/donation/`, 'Add funds') : '' }
        {menuItem(`/groups/${groupid}/transactions/new`, 'Add expense') }
        {userIsAdmin ? menuItem(`/groups/${groupid}/invite`, 'Add member') : '' }
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
