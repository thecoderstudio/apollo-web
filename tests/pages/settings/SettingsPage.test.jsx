import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SettingsPage from '../../../src/pages/settings/SettingsPage';

function getComponent() {
  return renderer.create(
    <BrowserRouter>
      <SettingsPage />
    </BrowserRouter>
  );
}

describe("settings page", () => {
  const props = { location: { pathname: 'location' } };

  it("render correctly", () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
