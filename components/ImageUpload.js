import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class ImageUpload extends Component {
  propTypes: {
    onFinished: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='ImageUpload' onClick={this.clickInput.bind(this)}>
        <img src='/images/camera.png' />
        <div>Upload photo</div>
        <div>
          <input type='file' name='file' ref='file' onChange={this.handleChange.bind(this)} />
        </div>
      </div>
    );
  }

  handleChange(e) {
    const { onFinished, uploadImage } = this.props;
    const file = ReactDOM.findDOMNode(this.refs.file).files[0];

    const formData = new FormData();
    formData.append('file', file);

    uploadImage(formData)
    .then(res => onFinished(res.response));
  }

  clickInput() {
    ReactDOM.findDOMNode(this.refs.file).click();
  }
}

export default ImageUpload;
