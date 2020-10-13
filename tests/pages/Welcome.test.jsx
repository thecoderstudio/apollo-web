import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import { StatusCodes } from 'http-status-codes';
import Welcome from '../../src/pages/Welcome';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <Welcome />
    </Provider>
  );
}

describe('Welcome', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authenticated: false
    });
  });

  it("renders login correctly", () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders change password correctly", () => {
    const tree = getComponent(mockStore({
      authenticated: true,
      currentUser: {
        hasChangedInitialPassword: false
      }
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("correctly sets pathname on authentication", () => {
    const component = getComponent(store);
    const root = component.root.findByProps({ authenticated: false });
    const instance = root.instance;
    instance.componentDidUpdate();

    instance.props = ({ authenticated: true });
    instance.componentDidUpdate();
    expect(window.location.pathname).toEqual("/");
  });
});
