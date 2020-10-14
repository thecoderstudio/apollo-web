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
  const props = { location: { pathname: 'location', match: { url: '/location' } } };

  it("render correctly", () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
