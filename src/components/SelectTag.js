import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SelectTag extends Component {
  render() {
    const { tags, attributes } = this.props;
    return (
      <select
        className='SelectTag'
        ref='select'
        value={attributes.tags ? attributes.tags[0] : tags[0]}
        onChange={this.handleChange.bind(this)}
      >
        {tags.map(tag => {
          return <option value={tag} key={tag}>{tag}</option>
        })}
      </select>
    );
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
  }
}

export default SelectTag;
