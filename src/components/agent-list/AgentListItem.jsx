import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ConnectionState from './ConnectionState';
import media from '../../util/media';

const propTypes = {
  agentName: PropTypes.string.isRequired,
  connectionState: PropTypes.string.isRequired
};

const Container = styled.li`
  display: grid;
  grid-template-columns: [name] 1fr [connection-status] 1fr;

  border-radius: 8px;
  border: 1px solid white;

  height: 30px;
  line-height: 30px;
  padding: 15px;
  margin-top: 25px;
  position: relative;

  ${
    media.phone`
      grid-template-rows: [name] 1fr [connection-status] 1fr;
      grid-template-columns: [name-and-status] 1fr;
      height: 100px;
    `
  }
`;

const StyledText = styled.p`
  grid-column: name;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
  padding-top: 0;
  margin-left: 25px;


  ${
    media.phone`
      grid-rows: name;
      grid-column: name-and-status;
    `
  }
`;

const ConnectionStateContent = styled.div`
  grid-column: connection-status;

  ${
    media.phone`
      grid-row: connection-status;
      grid-column: name-and-status;
    `
  }
`;

const StyledConnectionState = styled(ConnectionState)`
  float: right;

  ${
    media.phone`
      float: left;
    `
  }
`;

StyledConnectionState.displayName = StyledConnectionState;

export default function AgentListItem(props) {
  return (
    <Container>
      <StyledText>{props.agentName}</StyledText>
      <ConnectionStateContent>
        <StyledConnectionState connectionState={props.connectionState} />
      </ConnectionStateContent>
    </Container>
  );
}

AgentListItem.propTypes = propTypes;