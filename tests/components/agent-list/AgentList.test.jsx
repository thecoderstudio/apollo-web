import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import WS from 'jest-websocket-mock';
import { ThemeProvider } from 'styled-components';
import waitForExpect from 'wait-for-expect';
import { store as globalStore } from '../../../src/store';
import AgentList, { UnconnectedAgentList } from '../../../src/components/agent-list/AgentList';
import { listAgents } from '../../../src/actions/agent';
import { severity, notify } from '../../../src/actions/notification';
import { darkTheme } from '../../../src/theme';

// Mocks createPortal due to react-test-renderer incompatibility.
ReactDOM.createPortal = (node) => node;
const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <AgentList />
        </BrowserRouter>
      </ThemeProvider>
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
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    WS.clean();
  });

  it('renders correctly', () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly dispatches list agents', async () => {
    const data = [
      { id: 'id', name: 'name', connectionState: 'connected' },
      { id: 'id2', name: 'name', connectionState: 'connected' }
    ];

    const server = new WS('ws://localhost:1234/agent', { jsonProtocol: true });
    getComponent(store);

    await server.connected;

    server.send(data);

    await waitForExpect(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        listAgents(data)
      );
    });
  });

  it('correctly lists multiple agents', () => {
    const data = new Map();
    data.set('id', { id: 'id', name: 'name', connectionState: 'connected' });
    data.set('id2', { id: 'id2', name: 'name2', connectionState: 'connected' });
    store = mockStore({
      authenticated: true,
      agent: data
    });
    expect(getComponent(store)).toMatchSnapshot();
  });

  it('handles add agent modal', () => {
    const component = getComponent(store);
    const { root } = component;
    root.findByProps({ id: 'newAgentButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    root.findByType(UnconnectedAgentList).instance.closeAddAgentModal();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('handles websocket error', async () => {
    const spy = jest.spyOn(globalStore, 'dispatch');
    const server = new WS('ws://localhost:1234/agent', { jsonProtocol: true });
    getComponent(store).toJSON();

    await server.connected;

    expect(spy).toHaveBeenCalledWith(
      {
        id: 1,
        type: 'NOTIFY',
        message: 'Something went wrong fetching the agent list',
        severity: severity.ERROR
      }
    );
  });
});
