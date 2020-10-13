import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './buttons/Button';

const propTypes = {
  text: PropTypes.string.isRequired
};

const Wrapper = styled.div`
  grid-template-columns: [textField] 1fr [copy] 50px;
  display: grid;
  height: 50px;
`;

const TextField = styled.div`
  grid-column: textField;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: text;
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
  constructor(props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    const { text } = this.props;
    navigator.clipboard.writeText(text);
  }

  render() {
    const { text, className } = this.props;
    return (
      <Wrapper className={className}>
        <TextField>{text}</TextField>
        <StyledButton id='copyToClipboardButton' onClick={this.copyToClipboard}><Icon className="fas fa-copy" /></StyledButton>
      </Wrapper>
    );
  }
}

CopyToClipboard.propTypes = propTypes;

export default CopyToClipboard;
