import React, { Component, PropTypes } from 'react';
import BackButton from './BackButton';
import Currency from './Currency';

class GroupTitle extends Component {
  propTypes: {
    group: PropTypes.object.isRequired
  }

  render() {
    const { group } = this.props;
    const rightText = <Currency value={group.budget} />;

    return (
      <div className='Well'>
        <span className='Well-primary'>
          Available budget
        </span>
        <span className='Well-right'>
          <Currency value={group.budget} />
        </span>
      </div>
    );
  }
}

export default GroupTitle;
