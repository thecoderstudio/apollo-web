import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import App from '../src/App';

const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe('app', () => {
  it("renders correctly unauthenticated", () => {
    const store = mockStore({
      authenticated: false,
      currentUser: {},
      notifications: new Map({})
    });
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly authenticated", () => {
    const store = mockStore({
      agent: [],
      authenticated: true,
      currentUser: {},
      notifications: new Map({})
    });
    process.env = {
      APOLLO_WS_URL: 'ws://localhost:1234/',
      APOLLO_URL: 'http://localhost:1234'
    };
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
