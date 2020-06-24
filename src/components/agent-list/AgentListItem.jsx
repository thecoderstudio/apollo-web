import ConnectionStatus from './ConnectionStatus'
import React from 'react';
import styled from 'styled-components'
import Text from '../Text'

const Container = styled.li`
  display: grid;
  grid-template-columns: [name] 20% [connection-status] 1fr; 
  background-color: orange;

  border-radius: 8px;
	border: 1px solid white;
	
  height: 60px;
  padding: 20px;
  margin-top: 25px;
`;

const StyledText = styled(Text)`
	grid-column: name;
`;

export default function AgentListItem(props) {
	return (
		<Container>
			<StyledText>Agent name</StyledText>
			<ConnectionStatus />
		</Container>
	)
}