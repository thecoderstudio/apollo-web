import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
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
      authenticated: false
    });
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly authenticated", () => {
    const store = mockStore({
      agent: {
        agents: []
      },
      authenticated: true
    });
    process.env = {
      APOLLO_URL: 'http://localhost:1234'
    };
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
