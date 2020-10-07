import React from 'react';
import renderer from 'react-test-renderer';
import SettingsPage from '../../src/hoc/SettingsPage';

function getComponent() {
  return renderer.create(
    <SettingsPage />
  );
}

describe('Settings page', () => {
  const props = { location: 'location' };

  it('render correctly', () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
