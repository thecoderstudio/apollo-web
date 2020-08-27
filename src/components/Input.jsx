import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  background: ${props => props.theme.white};
  border: none;
  border-radius: 5px;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1rem;
  padding-left: 10px;
  opacity: 0.9;
`;

export default function Input(props) {
  return (
    <StyledInput {...props} />
  );
};
