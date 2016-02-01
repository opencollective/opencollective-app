import React from 'react';

import Icon from './Icon';

export default ({type, url, name, description}) => {

  const caption = encodeURIComponent("I just backed the " + name + "collective");
  const body = encodeURIComponent("I just backed the " + name + " collective: " + url + '\n\n' + description "Join me in supporting them!");
  const url_encoded = encodeURIComponent(url);

  const link = {
    twitter: `https://twitter.com/intent/tweet?status=${caption}%20${url_encoded}`,
    facebook: `https://www.facebook.com/sharer.php?url=${url_encoded}`,
    mail: `mailto:?subject=${caption}&body=${body}`,
  };

  const w = 650;
  const h = 450;
  const left = (screen.width / 2) - (w / 2);
  const top = (screen.height / 2) - (h / 2);

  return (
    <span
      onClick={() => window.open(link[type], 'ShareWindow', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)}
      className='ShareIcon'>
      <Icon type={type} />
    </span>
  )
};
