import React from 'react';

export default () => {
  return  (
    <div className='PublicFooter'>
      <img src='/static/images/logo-grey.svg' />
      <div className='PublicFooter-menu'>
        <div className='PublicFooter-menuItem'><a href="https://opencollective.com/FAQ">FAQ</a></div>
        <div className='PublicFooter-menuItem'><a href="mailto:info@opencollective.com">Contact</a></div>
      </div>
    </div>
  );
};
