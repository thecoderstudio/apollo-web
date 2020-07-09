import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import NavBar from '../../src/components/NavBar';
import { logout as logoutAction } from '../../src/actions/auth';

const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
}

describe('login', () => {
  let store;
  let spy;

  beforeEach(() => {
    store = mockStore({});
    spy = jest.spyOn(store, 'dispatch');
  });

  it("renders correctly", () => {
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful logout", async () => {
    let tree = getComponent(store);
    const instance = tree.root
    instance.findByType('button').props.onClick()
    expect(tree).toMatchSnapshot()
  });
});
