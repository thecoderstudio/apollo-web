import React from 'react';
import axios from 'axios';
import Button from './Button';

class NewAgentButton extends React.Component {
  constructor(props) {
    super(props);
    this.downloadBinary = this.downloadBinary.bind(this)
  };

  openDownloadModal() {

  }

  render() {
    return (
      <Button onClick={this.downloadBinary}>Download agent binary</Button>
    );
  };
}

export default NewAgentButton