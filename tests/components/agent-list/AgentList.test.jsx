import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import WS from 'jest-websocket-mock';
import AgentList from '../../../src/components/agent-list/AgentList';
import Enzyme, { mount , shallow} from 'enzyme';
import { ServerStyleSheet } from 'styled-components';
import Adapter from 'enzyme-adapter-react-16';

const mockStore = configureStore([]);

Enzyme.configure({ adapter: new Adapter() });


function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <AgentList />
    </Provider>
  );
}

describe('agentList', () => {
  let store;
  const socket = new WS(`ws://localhost:1234/agent`);

  beforeEach(() => {
    store = mockStore({
      authenticated: true,
      agent: []
    });
    process.env = {
      APOLLO_WS_URL: 'ws://localhost:1234/'
    };
  });

  afterEach(() => {
    WS.clean();
  });

  it("renders correctly", () => {
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("correctly dispatches list agents", async () => {
    await socket.connected;

    const component = mount( 
      <Provider store={store}>
        <AgentList />
     </Provider>
    ).find("AgentList");

    const spy = jest.spyOn(component.instance(), 'dispatchListAgents')
    const client = new WebSocket("ws://localhost:1234/agent");
    const data = [
      { id: "id", name: "name", connection_state: "connected" },
      { id: "id2", name: "name", connection_state: "connected" },
    ]

    client.send(data)
    expect(spy).toBeCalled()
    expect(spy).toBeCalledWith(data)
  }) 

  it("handles unexpected error correctly", async () => {
    await socket.connected
    socket.error()

    const component = getComponent(store);
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot()
  })

  it("correctly lists multiple agents", () => {
    store = mockStore({
      authenticated: true,
      agent: [
        { id: "id", name: "name", connection_state: "connected" },
        { id: "id2", name: "name", connection_state: "connected" },
      ]
    })
    const component = getComponent(store);
    expect(component.root.findAllByType("li").length).toBe(2);
  })
})
