import ConnectionState from './ConnectionState'
import React from 'react';
import styled from 'styled-components'
import Text from '../Text'
import PropTypes from 'prop-types';

const propTypes = {
	agentName: PropTypes.string.isRequired,
	connectionState: PropTypes.string.isRequired
}

const Container = styled.li`
  display: grid;
  grid-template-columns: [name] 20% [connection-status] 1fr; 

  border-radius: 8px;
	border: 1px solid white;

  height: 30px;
	line-height: 30px;
	padding: 15px;
	margin-top: 25px;
	
	background-color: red;
`;

const StyledText = styled(Text)`
	grid-column: name;
	background-color: black;
	min-width: 100px;
`;

export default function AgentListItem(props) {
	return (
		<Container>
			<StyledText>{props.agentName}</StyledText>
			<ConnectionState connectionState={props.connectionState} />
		</Container>
	)
}

AgentListItem.propTypes = propTypes