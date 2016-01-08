import React from 'react';
import ImageUpload from './ImageUpload';
import ProfilePhoto from './ProfilePhoto';

export default (props) => {
  const states = {
    emptyState: () => <ProfilePhoto url={props.currentUrl} size='110px' />,
    uploading: () => <ProfilePhoto url={props.currentUrl} size='110px' spinner='yes'/>,
    uploaded: () => <ProfilePhoto url={props.newUrl} size='110px' />
  };

  return <ImageUpload {...props} {...states} customClassName='ProfilePhotoUpload'/>;
};
