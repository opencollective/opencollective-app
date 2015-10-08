import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {

  render() {
    const { groupid } = this.props;
    const url = `/groups/${groupid}/transactions/new`;

    return (
      <div className='Footer'>
        <div className='Footer-addButton'>
          <Link to={url}>
            <span className='Footer-plusSign'>+</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Footer;
