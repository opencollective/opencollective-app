import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import spies from 'chai-spies';

import {
  App,
  mapStateToProps
} from '../../containers/App';

const {expect} = chai;
const {
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} = TestUtils;

const createElement = (props, className='App') => {
  const rendered = renderIntoDocument(<App {...props} />);
  return findRenderedDOMComponentWithClass(rendered, className);
};

chai.use(spies);

describe('App container', () => {

  it('does NOT need login if the url has public', () => {
    const props = mapStateToProps({
      router: {
        location: {
          pathname: 'http://localhost:3000/public/groups/1/'
        }
      }
    });

    expect(props.needsLogin).to.be.equal(false);
  });

  it('needs login if the url is not public', () => {
    const props = mapStateToProps({
      router: {
        location: {
          pathname: 'http://localhost:3000/'
        }
      }
    });

    expect(props.needsLogin).to.be.equal(true);
  });

  it('redirects to login if the user is not logged in on an authed route',  () => {
    const pushState = chai.spy((ctx, route) => {
      expect(route).to.be.equal('/login');
    });
    const decodeJWT = chai.spy(() => ({}));

    createElement({
      pushState,
      decodeJWT,
      needsLogin: true
    });

    expect(pushState).to.have.been.called();
    expect(decodeJWT).to.have.been.called();
  });

  it('does not redirect on public routes',  () => {
    const pushState = chai.spy(() => {});
    const decodeJWT = chai.spy(() => ({}));

    createElement({
      pushState,
      decodeJWT,
      needsLogin: false
    });

    expect(pushState).to.not.have.been.called();
    expect(decodeJWT).to.have.been.called();
  });

  it('does not redirect if user is authed',  () => {
    const pushState = chai.spy(() => {});
    const decodeJWT = chai.spy(() => ({ user: {id: 1  }}));

    createElement({
      pushState,
      decodeJWT,
      needsLogin: true
    });

    expect(pushState).to.not.have.been.called();
    expect(decodeJWT).to.have.been.called();
  });

});
