import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/lang/isFunction';

class ImageUpload extends Component {
  render() {
    const {newUrl, isUploading, customClassName } = this.props;
    const isUploaded = newUrl && newUrl.length > 0;

    return (
      <div className={customClassName || 'ImageUpload'} onClick={this.clickInput.bind(this, isUploading)}>
        { this.content({...this.props, isUploaded}) }
        <span>
          <input type='file' name='file' ref='file' className='ImageUpload-input' onChange={this.handleChange.bind(this)} />
        </span>
      </div>
    );
  }

  content({isUploaded, isUploading, uploading, uploaded, emptyState}) {
    if (isUploading) {
      return isFunction(uploading) ? uploading() : (
        <span>
          <img src='/images/uploading.png'  className='ImageUpload-img' />
          <div>Uploading...</div>
        </span>
      );
    } else if (isUploaded) {
      return isFunction(uploaded) ? uploaded() : (
        <span>
          <img className='ImageUpload-img' src={url} />
        </span>
      );
    } else {
      return isFunction(emptyState) ? emptyState() : (
        <div>
          <img src='/images/uploading.png' className='ImageUpload-img' />
          <div> Upload receipt</div>
        </div>
      );
    }
  }

  handleChange() {
    const { onFinished, uploadImage, tag } = this.props;
    const file = ReactDOM.findDOMNode(this.refs.file).files[0];

    const formData = new FormData();
    formData.append('file', file);

    uploadImage(formData, tag)
    .then(res => onFinished(res.response));
  }

  clickInput(isUploading) {
    if (!isUploading) {
      ReactDOM.findDOMNode(this.refs.file).click();
    }
  }

}

ImageUpload.propTypes = {
  onFinished: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  newUrl: PropTypes.string,
  tag: PropTypes.string
};

ImageUpload.defaultProps = {
  tag: ''
};



export default ImageUpload;
