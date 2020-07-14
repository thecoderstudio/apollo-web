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
  margin-left: 15px;

  color: ${props => getConnectionStateColor(props.connectionState, props.theme)}
`;

export default function ConnectionState(props) {
  return (
    <ContentWrapper className={props.className}>
      <Indicator connectionState={props.connectionState} />
      <StyledText connectionState={props.connectionState}>
        {props.connectionState.replace(/^\w/, (c) => c.toUpperCase())}
      </StyledText>
    </ContentWrapper>
  );
}

ConnectionState.propTypes = propTypes;
