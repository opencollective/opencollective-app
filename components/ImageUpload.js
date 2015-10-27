import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Icon from './Icon';

class ImageUpload extends Component {
  propTypes: {
    onFinished: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired,
    isUploaded: PropTypes.bool,
    isUploaded: PropTypes.bool,
    url: PropTypes.string
  }

  render() {
    const { isUploading, url } = this.props;
    const isUploaded = url && url.length > 0;

    let content = this.emptyState();

    if (isUploading) {
      content = this.uploading();
    } else if (isUploaded) {
      content = this.uploaded(url);
    }

    return (
      <div className='ImageUpload' onClick={this.clickInput.bind(this, isUploaded)}>
        { content }
        <div>
          <input type='file' name='file' ref='file' onChange={this.handleChange.bind(this)} />
        </div>
      </div>
    );
  }

  emptyState() {
    return (
      <div>
        <img src='/images/camera.png' />
        <div> Upload photo</div>
      </div>
    );
  }

  uploaded(url) {
    return (
      <div>
        <img src={url} />
      </div>
    );
  }

  uploading() {
    return (
      <span>
        <Icon type='loading' /> Uploading
      </span>
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

  clickInput(isUploaded) {
    if (!isUploaded) {
      ReactDOM.findDOMNode(this.refs.file).click();
    }
  }

}

export default ImageUpload;
