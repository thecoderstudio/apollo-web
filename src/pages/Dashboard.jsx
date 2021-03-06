import React from 'react';
import styled from 'styled-components';
import AgentList from '../components/agent-list/AgentList';
import media from '../util/media';

const Content = styled.div`
  display: grid;
  grid-template-columns: [agent-listing] 1fr 1fr;
  grid-template-rows: 1fr;
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
      <Content>
        <AgentList />
      </Content>
    </div>
  );
}