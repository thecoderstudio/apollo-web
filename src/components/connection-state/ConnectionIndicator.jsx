import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  connectionState: PropTypes.string.isRequired
};

const Indicator = styled.div`
  min-height: 12px;
  min-width: 12px;
  margin: 10px;
  border-radius: 50%;

  color: ${props => props.color};
  background-color: ${props => props.color};
`;

export function getColor(connectionState, theme) {
  switch (connectionState) {
    case 'connecting':
      return theme.connectingColor;
    case 'connected':
      return theme.connectedColor;
    case 'disconnected':
      return theme.disconnectedColor;
    default:
      return null;
  }
}

function ConnectionIndicator(props) {
  return <Indicator className={props.className} color={getColor(props.connectionState, props.theme)} />;
}

ConnectionIndicator.propTypes = propTypes;

export default withTheme(ConnectionIndicator);
