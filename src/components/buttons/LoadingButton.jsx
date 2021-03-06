import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';

const propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  loading: false,
  onClick: null
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.i`
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
    const {
      className, onClick, children, loading
    } = this.props;
    return (
      <StyledButton className={className} onClick={onClick}>
        {loading ? <Icon className="fas fa-spinner" /> : children}
      </StyledButton>
    );
  }
}

LoadingButton.propTypes = propTypes;
LoadingButton.defaultProps = defaultProps;

export default LoadingButton;
