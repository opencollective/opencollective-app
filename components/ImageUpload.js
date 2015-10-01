import React, { Component } from 'react';

class ImageUpload extends Component {
  render() {
    return (
      <div>
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
