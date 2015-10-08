import React, { Component, PropTypes } from 'react';
import BackButton from './BackButton';
import Currency from './Currency';
import Well from './Well';

class GroupTitle extends Component {
  propTypes: {
    group: PropTypes.object.isRequired
  }

  render() {
    const { group } = this.props;
    const rightText = <Currency value={group.budget} />;

    return (
      <div>
        <Well leftText='Available budget' rightText={rightText} />
      </div>
    );
  }
}

export default GroupTitle;
