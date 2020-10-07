import React from 'react';
import renderer from 'react-test-renderer';
import UserSettings from '../../../src/pages/settings/UserSettings';

function getComponent() {
  return renderer.create(
    <UserSettings />
  );
}

describe('User settings', () => {
  it('render correctly', () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });
});
