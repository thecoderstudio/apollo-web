import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.string,
  inverted: PropTypes.bool
};

const defaultProps = {
  error: '',
  inverted: false
};

const Container = styled.div`
  height: 80px;
`;

const StyledInput = styled.input`
  min-height: 50px;
  width: 100%;
  background: ${props => props.inverted ? props.theme.lightBlack : props.theme.white};
  color: ${props => props.inverted ? props.theme.white : "" };
  border: none;
  border-radius: 5px;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1rem;
  padding-left: 10px;
  opacity: 0.9;
  border: 1px solid ${props => props.hasError ? props.theme.error : 'transparent'};

  &:focus{
    outline: none;
    border: 1px solid ${props => props.theme.accent};
  }
`;

const Error = styled.p`
  color: ${props => props.theme.error};
  margin-top: 5px;
  font-size: 0.9rem;
`;

export default function Input(props) {
  const { className, error, ...rest } = props;
  const hasError = error.length > 0;
  return (
    <Container className={className}>
      <StyledInput hasError={hasError} {...rest} />
      { hasError && <Error>{error}</Error>}
    </Container>
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
