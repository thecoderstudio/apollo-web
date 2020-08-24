import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import WS from 'jest-websocket-mock';
import { ThemeProvider } from 'styled-components';
import AgentList from '../../../src/components/agent-list/AgentList';
import { listAgents } from '../../../src/actions/agent';
import waitForExpect from 'wait-for-expect';
import { darkTheme } from '../../../src/theme';


const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <AgentList />
      </ThemeProvider>
    </Provider>
  );
}

describe('agentList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authenticated: true,
      agent: []
    });
    process.env = {
      APOLLO_WS_URL: 'ws://localhost:1234/'
    };
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    WS.clean();
  });

  it("renders correctly", () => {
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it("correctly dispatches list agents", async () => {
    const data = [
      { id: "id", name: "name", connection_state: "connected" },
      { id: "id2", name: "name", connection_state: "connected" },
    ];

    const server = new WS(`ws://localhost:1234/agent`, { jsonProtocol: true });
    getComponent(store);

    await server.connected;

    server.send(data);

    await waitForExpect(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        listAgents(data)
      );
    });
  });


  it("correctly lists multiple agents", () => {
    store = mockStore({
      authenticated: true,
      agent: [
        { id: "id", name: "name", connection_state: "connected" },
        { id: "id2", name: "name", connection_state: "connected" },
      ]
    })
    expect(getComponent(store)).toMatchSnapshot();
  })
})
