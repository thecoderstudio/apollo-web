import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Button from "./Button";
import spinnerImg from '../../images/spinner.svg';

const propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.node.isRequired
};

const defaultProps = {
  loading: false
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.img`
  height: 25px;
  animation: ${rotate} 1.5s infinite linear;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  margin: auto;
  display: block;
`;

class LoadingButton extends React.PureComponent {
  render() {
    return(
      <StyledButton onClick={this.props.onClick }>
        {this.props.loading ? <Icon src={spinnerImg} /> : this.props.children}
      </StyledButton>
    )
  }
}

LoadingButton.propTypes = propTypes;
LoadingButton.defaultProps = defaultProps;

export default LoadingButton;