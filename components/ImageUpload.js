import React, { Component, PropTypes } from 'react';

class ImageUpload extends Component {
  propTypes: {
    onFinished: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='ImageUpload'>
        Upload photo
        <input type='file' name='file' ref='file' onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

  handleChange(e) {
    const { onFinished, uploadImage } = this.props;
    const file = React.findDOMNode(this.refs.file).files[0];

    const formData = new FormData();
    formData.append('file', file);

    uploadImage(formData)
    .then(res => onFinished(res.response));
  }
}

export default ImageUpload;
