import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import ConnectionIndicator, { getColor } from './ConnectionIndicator';

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
  display: grid;
  grid-template-columns: [status-indicator] 20px [status-text] 1fr;
`;

const Indicator = styled(ConnectionIndicator)`
  grid-column: status-indicator;
  float: right;
  text-align: left;
`;

const StyledText = styled.p`
  grid-column: status-text;
  position: relative;
  margin: 0;
  padding-top: 0;
  margin-left: 15px;
  text-align: left;

  color: ${props => props.color};
`;

function ConnectionState(props) {
  return (
    <Container className={props.className}>
      <Indicator connectionState={props.connectionState} />
      <StyledText color={getColor(props.connectionState, props.theme)}>
        {props.connectionState.replace(/^\w/, (c) => c.toUpperCase())}
      </StyledText>
    </Container >
  );
}

ConnectionState.propTypes = propTypes;

export default withTheme(ConnectionState);
