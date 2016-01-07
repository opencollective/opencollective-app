import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ProfilePhoto from '../components/ProfilePhoto';

class ProfilePhotoUpload extends Component {
  render() {
    const {newUrl, isUploading } = this.props;
    const isUploaded = newUrl && newUrl.length > 0;

    return (
      <div className='ProfilePhotoUpload' onClick={this.clickInput.bind(this, isUploaded)}>
        { this.content({isUploading, isUploaded, newUrl}) }
        <span>
          <input type='file' name='file' ref='file' className='ProfilePhotoUpload-input' onChange={this.handleChange.bind(this)} />
        </span>
      </div>
    );
  }

  content({isUploaded, isUploading, newUrl}) {
    if (isUploading) {
      return this.uploading();
    } else if (isUploaded) {
      return this.uploaded(newUrl);
    } else {
      return this.emptyState();
    }
  }

  emptyState() {
    return (
      <ProfilePhoto backgroundUrl={this.props.currentUrl} size='110px' foregroundUrl='/images/upload-photo.svg' />
    );
  }

  uploading() {
    return (
      <ProfilePhoto backgroundUrl={this.props.currentUrl} size='110px' spinner='yes'/>
    );
  }

  uploaded(newUrl) {
    return (
      <ProfilePhoto backgroundUrl={newUrl} size='110px' />
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

ProfilePhotoUpload.propTypes = {
  onFinished: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  currentUrl: PropTypes.string,
  newUrl: PropTypes.string
};

export default ProfilePhotoUpload;
