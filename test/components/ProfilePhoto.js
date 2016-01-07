import { expect } from 'chai';

import ProfilePhoto from '../../components/ProfilePhoto';


describe('ProfilePhoto component', () => {
  it('should have a default image', () => {
    const element = ProfilePhoto({});
    expect(element.props.style.backgroundImage).to.be.equal('url(/images/default_avatar.svg)');
  });

  it('should have a default size', () => {
    const element = ProfilePhoto({});
    expect(element.props.style.width).to.be.equal('55px');
    expect(element.props.style.height).to.be.equal('55px');
  });

  it('should render an image if provided', () => {
    const url = 'image.jpg';
    const element = ProfilePhoto({ url });
    expect(element.props.style.backgroundImage).to.be.equal('url('+url+')');
  });

  it('should apply the sizes', () => {
    const size = '10px';
    const element = ProfilePhoto({ size });
    expect(element.props.style.width).to.be.equal(size);
    expect(element.props.style.height).to.be.equal(size);  });
});
