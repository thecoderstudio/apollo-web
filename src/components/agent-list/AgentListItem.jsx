import ConnectionStatus from './ConnectionStatus'
import React from 'react';
import styled from 'styled-components'
import Text from '../Text'

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
			<StyledText>Agent name</StyledText>
			<ConnectionStatus />
		</Container>
	)
}