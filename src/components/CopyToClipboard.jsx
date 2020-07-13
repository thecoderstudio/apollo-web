import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired
}

const Wrapper = styled.div`
  grid-template-columns: [textfield] 1fr [copy] 50px;
`;

const TextField = styled.div`
  grid-column: textfield;
`;
const Button = styled.div`
  grid-column: copy;
`;
const Icon = styled.div`
  text-align: center;
  display: block;
`;

class CopyToClipboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.props.text);
  }

  render() {
    return(
      <Wrapper>
        <TextField>{this.props.text}</TextField>
        <Button onClick={this.copyToClipboard}><Icon /></Button>
      </Wrapper>
    );
  };
}

CopyToClipboard.propTypes = propTypes;

export default CopyToClipboard;