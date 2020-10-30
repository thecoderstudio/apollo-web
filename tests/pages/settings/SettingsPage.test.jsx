import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SettingsPage from '../../../src/pages/settings/SettingsPage';

const mockStore = configureStore([]);

function getComponent(store, props, path) {
  return renderer.create(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <SettingsPage {...props} />
      </MemoryRouter>
    </Provider>
  );
}

describe("settings page", () => {
  const props = {
    location: {
      pathname: '/settings/user_settings'
    },
    match: {
      url: '/settings'
    }
  };
  let store;

  beforeEach(() => {
    store = mockStore({
      currentUser: {
        username: 'admin'
      }
    });
  });

  it("render correctly user settings", () => {
    const tree = getComponent(store, props, props.location.pathname).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render correctly not found", () => {
    const tree = getComponent(store, props, 'settings/notfound').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
