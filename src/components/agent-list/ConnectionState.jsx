import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  connectionState: PropTypes.string.isRequired
};

const getConnectionStateColor = (connectionState, theme) => {
  switch (connectionState) {
    case 'connecting':
      return theme.connectingColor;
    case 'connected':
      return theme.connectedColor;
    case 'disconnected':
      return theme.disconnectedColor;
    default:
      return;
  }
};

const Container = styled.div`
  margin-left: 25px;
  margin-right: 25px;
  display: grid;
  grid-template-columns: [status-indicator] 20px [status-text] 1fr;
`;

const Indicator = styled.div`
  grid-column: status-indicator;

  height: 12px;
  width: 12px;
  margin: 10px;
  border-radius: 50%;

  float: right;
  text-align: left;
  color: ${props => props.connectionStateColor};
  background-color: ${props => props.connectionStateColor};
`;

const StyledText = styled.p`
  grid-column: status-text;
  position: relative;
  margin: 0;
  padding-top: 0;
  margin-left: 25px;
  text-align: left;

  color: ${props => props.connectionStateColor};
`;

function ConnectionState(props) {
  const connectionStateColor = getConnectionStateColor(props.connectionState, props.theme);
  console.log(props);
  return (
    <Container className={props.className}>
      <Indicator connectionStateColor={connectionStateColor} />
      <StyledText connectionStateColor={connectionStateColor}>
        {props.connectionState.replace(/^\w/, (c) => c.toUpperCase())}
      </StyledText>
    </Container >
  );
}

ConnectionState.propTypes = propTypes;

export default withTheme(ConnectionState);