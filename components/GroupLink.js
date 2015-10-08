import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Currency from './Currency';

class GroupTitle extends Component {
  propTypes: {
    id: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const { id, name, budget } = this.props;
    const url = `/groups/${id}/transactions/`;

    return (
      <div className='Well GroupLink'>
        <Link to={url}>
          <span className='GroupLink-name'>
            {name}
          </span>
          <span className='GroupLink-balance'>
            <Currency value={budget} /> &#8250;
          </span>
        </Link>
      </div>
    );
  }
}

export default GroupTitle;
