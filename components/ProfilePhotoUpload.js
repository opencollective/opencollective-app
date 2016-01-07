import React from 'react';
import ImageUpload from './ImageUpload';
import ProfilePhoto from './ProfilePhoto';

export default (props) => {
  const states = {
	emptyState: () => <ProfilePhoto backgroundUrl={props.currentUrl} size='110px' />,
    uploading: () => <ProfilePhoto backgroundUrl={props.currentUrl} size='110px' spinner='yes'/>,
    uploaded: () => <ProfilePhoto backgroundUrl={props.newUrl} size='110px' />
  };

  return <ImageUpload {...props} {...states} customClassName='ProfilePhotoUpload'/>;
};
