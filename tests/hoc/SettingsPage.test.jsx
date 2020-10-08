import React from 'react';
import renderer from 'react-test-renderer';
import SettingsPage from '../../src/hoc/SettingsPage';

function getComponent() {
  return renderer.create(
    <SettingsPage />
  );
}

describe("settings page", () => {
  const props = { location: { pathname: 'location' } };

  it("render correctly", () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
