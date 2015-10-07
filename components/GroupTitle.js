import React, { Component } from 'react';
import BackButton from './BackButton';
import Currency from './Currency';
import Well from './Well';

class GroupTitle extends Component {
  render() {
    const { group } = this.props;
    const rightText = <Currency value={group.budgetLeft} />;

    return (
      <div>
        <Well leftText='Available budget' rightText={rightText} />
      </div>
    );
  }
}

export default GroupTitle;
