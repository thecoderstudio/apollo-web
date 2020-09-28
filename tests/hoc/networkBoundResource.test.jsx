import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { connect, Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Map as ImmutableMap } from 'immutable';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import waitForExpect from 'wait-for-expect';
import Card from '../../src/components/Card';
import NotFound from '../../src/pages/NotFound';
import withNetworkBoundResource from '../../src/hoc/networkBoundResource';
import { darkTheme } from '../../src/theme';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store, dataId = null, spy = jest.fn()) {
  const Component = connect(
    state => ({
      localData: ImmutableMap(state.localData),
      match: { params: state.params }
    })
  )(withNetworkBoundResource(
    Card,
    (localData, params) => localData.get(dataId),
    (params) => `${process.env.APOLLO_HTTP_URL}/test`,
    (data) => spy(data)
  ));


  return renderer.create(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

describe("network bound resource", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      localData: { name: 'test' },
      params: {}
    });
    store.dispatch = jest.fn();
  });

  it("renders loading", () => {
    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {}
    });

    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders not found", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.NOT_FOUND,
        statusText: "not found",
        data: {}
      }
    }));
    const component = getComponent(store)
    let tree = component.toJSON();

    await waitForExpect(() => {
      expect(component.root.findAllByType(NotFound)).toHaveLength(1);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it("renders success from remote", async () => {
    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {test: true}
    });

    const spy = jest.fn();
    const component = getComponent(store, null, spy)
    let tree = component.toJSON();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledWith({ test: true });
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it("renders success from cache", async () => {
    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {}
    });

    const component = getComponent(store, "name")
    let tree = component.toJSON();

    await waitForExpect(() => {
      expect(component.root.findAllByType(Card)).toHaveLength(1);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
