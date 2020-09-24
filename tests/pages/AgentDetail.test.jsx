import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { darkTheme } from '../../src/theme';
import AgentDetail from '../../src/pages/AgentDetail';

const mockStore = configureStore([]);

function getComponent(agent) {
  let agents = new Map();
  agents.set(agent.id, agent);
  let store = mockStore({
    agent: agents
  })

  return renderer.create(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <AgentDetail 
          match={{
            params: {
              agentId: "fakeid"
            }
          }}
        />
      </ThemeProvider>
    </Provider>
  );
}


describe("agent detail", () => {
  const defaultAgent = {
    'id': 'fakeid'
  }

  it("renders correctly", () => {
    let tree = getComponent(defaultAgent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
