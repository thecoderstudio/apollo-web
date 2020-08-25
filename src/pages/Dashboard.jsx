import React from 'react';
import styled from 'styled-components';
import AgentList from '../components/agent-list/AgentList';
import media from '../util/media';
import NavBar from '../components/NavBar';

const StyledAgentList = styled(AgentList)`
  grid-column: agent-listing;
`;

const Content = styled.div`
  grid-template-columns: [agent-listing] 1fr 1fr;
  grid-template-rows: 1fr;

  display: grid;
  grid-row: 2;
  margin: 25px;

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
