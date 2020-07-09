import React from 'react';
import axios from 'axios';
import Button from './Button';

class BinaryDownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.downloadBinary = this.downloadBinary.bind(this)
  };

  downloadBinary() {
    axios.get(
      `${process.env.APOLLO_HTTP_URL}agent/download`,
    )
      .then(res => {
        if (res.status === 200) {
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          element.setAttribute('download', filename);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        }
      });
  }

  render() {
    return (
      <Button onClick={this.downloadBinary}>Download agent binary</Button>
    );
  };
}

export default BinaryDownloadButton