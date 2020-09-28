import React from 'react';
import styled, { withTheme } from 'styled-components';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string
};

const defaultProps = {
  type: 'TailSpin'
};

const StyledLoader = styled(Loader)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  width: 100px;
`;

function Spinner(props) {
  return (
    <StyledLoader
      type={props.type}
      color={props.theme.primary}
    />
  );
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default withTheme(Spinner);
