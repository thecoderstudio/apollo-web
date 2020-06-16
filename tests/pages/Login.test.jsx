import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Login from '../../src/pages/Login';

const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

describe('login', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {authenticated: false}
    });
  });

  it("renders correctly", () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
