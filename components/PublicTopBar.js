import React from 'react';

export default () => {
  return (
    <div className='PublicTopBar'>
      <div className='PublicTopBar-tagLine'>
        <div className='OC-Icon'>
          <i className='Icon Icon--oc' />
        </div>
        <div className="Tagline">
          <a href="https://opencollective.com#apply">
            Join OpenCollective to start collecting funds
          </a>
        </div>
      </div>
      <div className='PublicTopBar-signup'>
        <a href="https://app.opencollective.com">Sign in</a>
      </div>
    </div>
  );
};
