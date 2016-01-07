import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

class ImageUpload extends Component {
  render() {
    const { url, isUploading, tag } = this.props;
    const isUploaded = url && url.length > 0;
    const className = classnames({
      ImageUpload: true,
      'ImageUpload--isUploaded': isUploaded,
      'ImageUpload--isUploading': isUploading
    })

    return (
      <div className={className} onClick={this.clickInput.bind(this, isUploaded)}>
        <div className='ImageUpload-content'>
          { this.content({isUploading, isUploaded, url}) }
        </div>
        <span>
          <input type='file' name='file' ref='file' className='ImageUpload-input' onChange={this.handleChange.bind(this)} />
        </span>
      </div>
    );
  }

  content({isUploaded, isUploading, url}) {
    if (isUploading) {
      return this.uploading();
    } else if (isUploaded) {
      return this.uploaded(url);
    } else {
      return this.emptyState();
    }
  }

  emptyState() {
    return (
      <div>
        <img src='/images/camera.png' className='ImageUpload-img' />
        <div> Upload photo</div>
      </div>
    );
  }

  uploaded(url) {
    return (
      <span>
        <img className='ImageUpload-img' src={url} />
      </span>
    );
  }

  uploading() {
    return (
      <span>
        <img src='/images/uploading.png'  className='ImageUpload-img' />
        <div>Uploading...</div>
      </span>
    );
  }

  handleChange() {
    const { onFinished, uploadImage, tag } = this.props;
    const file = ReactDOM.findDOMNode(this.refs.file).files[0];

    const formData = new FormData();
    formData.append('file', file);

    uploadImage(formData, tag)
    .then(res => onFinished(res.response));
  }

  clickInput(isUploaded) {
    if (!isUploaded) {
      ReactDOM.findDOMNode(this.refs.file).click();
    }
  }

}

ImageUpload.propTypes = {
  onFinished: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  url: PropTypes.string,
  tag: PropTypes.string
};

ImageUpload.defaultProps = {
  tag: ''
};

export default ImageUpload;
