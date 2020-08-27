import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
`;

const StyledInput = styled.input`
  min-height: 50px;
  width: 100%;
  background: ${props => props.theme.white};
  border: none;
  border-radius: 5px;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1rem;
  padding-left: 10px;
  opacity: 0.9;
`;

const Error = styled.p`
  color: ${props => props.theme.error};
`;

export default function Input(props) {
  const { className, ...rest } = props;
  return (
    <Container className={className}>
      <StyledInput {...rest} />
      <Error>Test</Error>
    </Container>
  );
};
