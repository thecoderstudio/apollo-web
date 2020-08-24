import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import AgentListItem from '../../../src/components/agent-list/AgentListItem';
import { darkTheme } from '../../../src/theme';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={darkTheme}>
      <AgentListItem agentName="agentName" connectionState="connected" />
    </ThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
