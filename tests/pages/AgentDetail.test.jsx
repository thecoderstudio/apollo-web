import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import { StatusCodes } from 'http-status-codes';
import { darkTheme } from '../../src/theme';
import AgentDetail from '../../src/pages/AgentDetail';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponentTags(agent) {
  let agents = new Map();
  agents.set(agent.id, agent);
  let store = mockStore({
    agent: agents
  });

  return (
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

function getComponent(agent) {
  return renderer.create(getComponentTags(agent));
}


describe("agent detail", () => {
  const defaultAgent = {
    'id': 'fakeid',
    'name': 'agentName',
    'architecture': 'amd64',
    'connectionState': 'disconnected',
    'operatingSystem': 'darwin'
  };

  it("renders correctly", () => {
    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: defaultAgent
    });
    let tree = getComponent(defaultAgent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("correctly syncs with remote", async () => {
    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {
        'id': 'fakeid',
        'name': 'remote',
        'architecture': 'amd64',
        'connection_state': 'disconnected',
        'operating_system': 'darwin'
      }
    });

    let tree = getComponent(defaultAgent).toJSON();

    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.APOLLO_HTTP_URL}agent/fakeid`,
        { withCredentials: true }
      );
      expect(tree).toMatchSnapshot();
    });
  });

  it("handles sync failure", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {}
      }
    }));

    let tree = getComponent(defaultAgent).toJSON();

    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.APOLLO_HTTP_URL}agent/fakeid`,
        { withCredentials: true }
      );
      expect(tree).toMatchSnapshot();
    });
  });

  it("deals with property updates correctly", () => {
    const component = getComponent(defaultAgent);
    let tree = component.toJSON();
    const newAgent = Object.assign({}, defaultAgent);
    newAgent['name'] = 'newname';
    component.update(getComponentTags(newAgent));

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders unkown platform info correctly", () => {
    const newAgent = Object.assign({}, defaultAgent);
    newAgent['operatingSystem'] = null;
    newAgent['architecture'] = null;
    const component = getComponent(newAgent);
  });

  it("opens terminal", () => {
    const component = getComponent(defaultAgent);
    let tree = component.toJSON();
    component.root.findAllByType('i')[1].props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const connectedAgent = Object.assign({}, defaultAgent);
    connectedAgent['connectionState'] = 'connected';
    component.update(getComponentTags(connectedAgent));
    component.root.findAllByType('i')[1].props.onClick();
    expect(tree).toMatchSnapshot();
  });
});
