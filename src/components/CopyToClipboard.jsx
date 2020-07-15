import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './buttons/Button';
import copyImg from '../images/copy.svg'

const propTypes = {
  text: PropTypes.string.isRequired
}

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
  cursor: pointer;
  text-align:left;
  padding: 15px;
  background-color: ${props => props.theme.lightBlack};
  text-overflow: ellipsis; 
  white-space: nowrap;
  overflow: hidden;
  
`;

const StyledButton = styled(Button)`
  grid-column: copy;
  height: 100%;
`;

const Icon = styled.img`
  text-align: center;
  display: block;
  width: 60%;
  margin-left: 20%;
  height: 60%;
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
        <StyledButton id='copyToClipboardButton' onClick={this.copyToClipboard}><Icon src={copyImg} /></StyledButton>
      </Wrapper>
    );
  };
}

CopyToClipboard.propTypes = propTypes;

export default CopyToClipboard;