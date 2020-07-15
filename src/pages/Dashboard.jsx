import AgentList from '../components/agent-list/AgentList';
import media from '../util/media';
import ContentContainer from '../components/Content';
import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';

const Content = styled(ContentContainer)`
  grid-template-columns: [agent-listing] 1fr 1fr;
  grid-template-rows: 1fr;  

  ${
    media.phone`
      grid-template-columns: [agent-listing] 1fr;
    `
  }
`;

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <Content>
        <AgentList />
      </Content>
    </div>
  );
}