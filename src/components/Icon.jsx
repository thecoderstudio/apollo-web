import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  active: PropTypes.bool
}

const defaultProps = {
  active: true
}

const Icon = styled.i`
  cursor: ${props => props.active ? 'pointer' : 'inherit'};
`;

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon
