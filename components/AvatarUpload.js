import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Avatar from '../components/Avatar';

class AvatarUpload extends Component {
  render() {
    const { url, isUploading } = this.props;
    const isUploaded = url && url.length > 0;

    return (
      <div className='AvatarUpload' onClick={this.clickInput.bind(this, isUploaded)}>
        <div className='AvatarUpload-content'>
          { this.content({isUploading, isUploaded, url}) }
        </div>
        <span>
          <input type='file' name='file' ref='file' className='AvatarUpload-input' onChange={this.handleChange.bind(this)} />
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
      <Avatar backgroundUrl={this.props.user.avatar} size='110px' foregroundUrl='/images/upload-photo.svg' />
    );
  }

  uploading() {
    return (
      <Avatar backgroundUrl={this.props.user.avatar} size='110px' spinner='yes'/>
    );
  }

  uploaded(url) {
    return (
      <Avatar backgroundUrl={url} size='110px' />
    );
  }



  handleChange() {
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

AvatarUpload.propTypes = {
  onFinished: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  url: PropTypes.string
};

export default AvatarUpload;
