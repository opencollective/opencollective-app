import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Currency from './Currency';
import Icon from './Icon';

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
      <div className='GroupLink'>
        <Link to={url}>
          <div className='Well'>
            <span className='Well-primary'>
              {name}
            </span>
            <span className='Well-right'>
              <Currency value={budget} /> <Icon type='right' />
            </span>
          </div>
        </Link>
      </div>
    );
  }
}

export default GroupTitle;
