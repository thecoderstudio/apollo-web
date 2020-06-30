import ConnectionState from './ConnectionState';
import media from '../../util/media';
import React from 'react';
import styled from 'styled-components';
import Text from '../Text';
import PropTypes from 'prop-types';

const propTypes = {
  agentName: PropTypes.string.isRequired,
  connectionState: PropTypes.string.isRequired
};

const Container = styled.li`
  display: grid;
  grid-template-columns: [name] 20% [connection-status] 1fr; 

  border-radius: 8px;
	border: 1px solid white;

  height: 30px;
	line-height: 30px;
	padding: 15px;
	margin-top: 25px;

	${
    media.phone`
      grid-template-rows: [name] 1fr [connection-status] 1fr; 
      grid-template-columns: [name-and-status] 1fr; 
      height: 100px;
    `
  }
`;

const StyledText = styled(Text)`
	grid-column: name;
	min-width: 100px;

	${
    media.phone`
      grid-rows: name; 
      grid-column: name-and-status;
    `
  }
`;

export default function AgentListItem(props) {
  return (
    <Container>
      <StyledText>{props.agentName}</StyledText>
      <ConnectionState connectionState={props.connectionState} />
    </Container>
  );
}

AgentListItem.propTypes = propTypes;