import React from 'react';
import { expect } from 'chai';

import Avatar from '../../components/Avatar';

describe('Avatar component', () => {
  it('should have a default image', () => {
    const element = Avatar({});
    expect(element.props.src).to.be.equal('/images/default_avatar.svg');
  });

  it('should have a default size', () => {
    const element = Avatar({});
    expect(element.props.style.width).to.be.equal('55px');
    expect(element.props.style.height).to.be.equal('55px');
  });

  it('should render an image if provided', () => {
    const url = 'image.jpg';
    const element = Avatar({ url });
    expect(element.props.src).to.be.equal(url);
  });

  it('should apply the sizes', () => {
    const size = '10px';
    const element = Avatar({ size });
    expect(element.props.style.width).to.be.equal(size);
    expect(element.props.style.height).to.be.equal(size);  });
});
