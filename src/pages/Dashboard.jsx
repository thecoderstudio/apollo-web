import AgentList from '../components/agent-list/AgentList'
import ContentContainer from '../components/Content'
import React from 'react';
import styled from 'styled-components'


const Content = styled(ContentContainer)`
  grid-template-columns: [agent-listing] 1fr 1fr;
  grid-template-rows: 1fr;  
`;

export default function Dashboard(props) {
  return (
    <Content>
      <AgentList />
    </Content>
  )
}