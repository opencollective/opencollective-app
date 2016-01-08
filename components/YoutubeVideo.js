import React from 'react';

export default ({
  id,
  width='560',
  height='315'
}) => (
  <div className='YoutubeVideo'>
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder='0'
      allowfullscreen>
    </iframe>
  </div>
);