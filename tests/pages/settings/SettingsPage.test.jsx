import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SettingsPage from '../../../src/pages/settings/SettingsPage';

function getComponent(props) {
  return renderer.create(
    <BrowserRouter>
      <SettingsPage {...props} />
    </BrowserRouter>
  );
}

describe("settings page", () => {
  const props = {
    location: {
      pathname: '/settings/location'
    },
    match: {
      url: '/settings'
    }
  };

  it("render correctly", () => {
    let tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();

    props.location.pathname = '/settings/x';
    tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
