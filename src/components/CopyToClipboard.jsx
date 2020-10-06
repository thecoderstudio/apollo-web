import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './buttons/Button';

const propTypes = {
  text: PropTypes.string.isRequired
};

const Wrapper = styled.div`
  grid-template-columns: [textfield] 1fr [copy] 50px;
  display: grid;
  height: 50px;
`;

const TextField = styled.div`
  grid-column: textfield;

  border: none;
  border-radius: 5px;
  color: white;
  font-family: 'B612', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: text;
  text-align:left;
  padding: 15px;
  background-color: ${props => props.theme.lightBlack};
  overflow: auto;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    background: transparent;
  }
`;

const StyledButton = styled(Button)`
  grid-column: copy;
  height: 100%;
`;

const Icon = styled.i`
  text-align: center;
  display: block;
`;

class CopyToClipboard extends React.PureComponent {
  copyToClipboard = () => {
    navigator.clipboard.writeText(this.props.text);
  }

  render() {
    return(
      <Wrapper>
        <TextField>{this.props.text}</TextField>
        <StyledButton id='copyToClipboardButton' onClick={this.copyToClipboard}><Icon className="fas fa-copy" /></StyledButton>
      </Wrapper>
    );
  }
}

CopyToClipboard.propTypes = propTypes;

export default CopyToClipboard;