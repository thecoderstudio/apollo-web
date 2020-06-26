import React from 'react';
import renderer from 'react-test-renderer';
import AgentListItem from '../../../src/components/agent-list/AgentListItem';

it('renders correctly', () => {
    const tree = renderer
        .create(<AgentListItem agentName="agentName" connectionState="connected" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
