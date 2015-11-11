import expect from 'expect';
import isViewerOnly from '../../src/lib/is_viewer_only';

describe('isViewerOnly', () => {

  it('should return false if one group role is not viewer', () => {
    const groups = [
      { role: 'admin' },
      { role: 'viewer' }
    ];

    expect(isViewerOnly(groups), false);
  });

  it('should return true if all groups role are viewer', () => {
    const groups = [
      { role: 'viewer' },
      { role: 'viewer' }
    ];

    expect(isViewerOnly(groups), true);
  });

});
