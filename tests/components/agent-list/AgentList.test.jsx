import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import WS from 'jest-websocket-mock';
import AgentList from '../../../src/components/agent-list/AgentList';
import { listAgents } from '../../../src/actions/agent';
import waitForExpect from 'wait-for-expect';

const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <AgentList />
    </Provider>
  );
}

describe('agentList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authenticated: true,
      agent: new Map()
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
    expect(tree).toMatchSnapshot();
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
  })


  it("correctly lists multiple agents", () => {
    const data = new Map();
    data.set('id', { id: "id", name: "name", connection_state: "connected" })
    data.set('id2', { id: "id2", name: "name2", connection_state: "connected" })
    store = mockStore({
      authenticated: true,
      agent: data
    })
    const component = getComponent(store);
    expect(component.root.findAllByType("li").length).toBe(2);
  })
})
