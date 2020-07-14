import React from 'react';
import renderer from 'react-test-renderer';
import AgentListItem from '../../../src/components/agent-list/AgentListItem';

it('renders correctly', () => {
  const tree = renderer
    .create(<AgentListItem agent={{ id: "fakeid", name: "agentName", connection_state: "connected" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
