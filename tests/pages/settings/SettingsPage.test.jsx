import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SettingsPage from '../../../src/pages/settings/SettingsPage';

const mockStore = configureStore([]);

function getComponent(props, path) {
  return renderer.create(
    <Provider store={mockStore()}>
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

  it("render correctly user settings", () => {
    const tree = getComponent(props, props.location.pathname).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render correctly not found", () => {
    const tree = getComponent(props, 'settings/notfound').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
