import { expect } from 'chai';

import Avatar from '../../components/Avatar';


describe('Avatar component', () => {
  it('should have a default image', () => {
    const element = Avatar({});
    expect(element.props.children[0].props.style.backgroundImage).to.be.equal('url(/images/default_avatar.svg)');
  });

  it('should have a default size', () => {
    const element = Avatar({});
    expect(element.props.children[0].props.style.width).to.be.equal('55px');
    expect(element.props.children[0].props.style.height).to.be.equal('55px');
  });

  it('should render an image if provided', () => {
    const backgroundUrl = 'image.jpg';
    const element = Avatar({ backgroundUrl });
    expect(element.props.children[0].props.style.backgroundImage).to.be.equal('url('+backgroundUrl+')');
  });

  it('should apply the sizes', () => {
    const size = '10px';
    const element = Avatar({ size });
    expect(element.props.children[0].props.style.width).to.be.equal(size);
    expect(element.props.children[0].props.style.height).to.be.equal(size);  });
});
