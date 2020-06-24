import React from 'react';
import styled from 'styled-components'

const Container = styled.li`
  display: grid;
  grid-template-columns: [name] 50px [connection-status] 1fr; 
  background-color: orange;

  border-radius: 8px;
  border: 1px solid white;
  height: 70px;
`;

export default function AgentListItem(props) {
    return (
        <Container></Container>
    )
}