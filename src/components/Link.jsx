import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  disabled: PropTypes.bool
};

const defaultProps = {
  disabled: false
};

const StyledLink = styled(ReactLink)`
  text-decoration: none;
  cursor: ${props => props.disabled ? 'inherit' : 'pointer'};
  pointer-events: ${props => props.disabled ? 'none': 'inherit'};

  &:hover {
    opacity: ${props => props.disabled ? 0.20 : 0.90};
  }
`;

export default function Link(props) {
  return <StyledLink {...props} />;
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
