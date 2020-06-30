import React from 'react';
import media from '../../util/media';
import styled from 'styled-components';
import Text from '../Text';
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
  grid-column: connection-status;
  margin-left: 25px;
  margin-right: 25px;

  ${
    media.phone`
      grid-row: connection-status; 
      grid-column: name-and-status;
    `
  }
`;

const ContentWrapper = styled.div`
  float: right;
  display: grid;
  grid-template-columns: [status-indicator] 20px [status-text] 1fr;

  ${
    media.phone`
      float:left;
    `
  }
`;

const Indicator = styled.div`
  grid-column: status-indicator;

  height: 12px;
  width: 12px;
  margin: 10px;
  border-radius: 50%;

  float: right;
  text-align: left;

  background-color: ${props => getConnectionStateColor(props.connectionState, props.theme)}
`;

const StyledText = styled(Text)`
  grid-column: status-text;
  position: relative;
  text-align: left;

  color: ${props => getConnectionStateColor(props.connectionState, props.theme)}
`;

export default function ConnectionState(props) {
  return (
    <Container>
      <ContentWrapper>
        <Indicator connectionState={props.connectionState} />
        <StyledText connectionState={props.connectionState}>
          {props.connectionState.replace(/^\w/, (c) => c.toUpperCase())}
        </StyledText>
      </ContentWrapper>
    </Container >
  );
}

ConnectionState.propTypes = propTypes;