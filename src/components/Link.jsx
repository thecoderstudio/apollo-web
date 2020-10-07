import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(ReactLink)`
  text-decoration: none;
  color: ${(props) => props.theme.white};

  &:hover {
    opacity: 0.90;
  }
`;

export default function Link(props) {
  return <StyledLink {...props} />;
}
