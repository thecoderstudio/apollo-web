import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SettingsSideNavigation from '../../src/components/SettingsSideNavigation';

function getComponent(props) {
  return renderer.create(
    <BrowserRouter>
      <SettingsSideNavigation {...props} />
    </BrowserRouter>
  );
}

describe('Settings side navigation', () => {
  let props;

  beforeEach(() => {
    props = {
      location: '/settings/user_settings'
    };
  });

  it('renders correctly', () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly check if path is active', () => {
    let tree = getComponent(props);
    let instance = tree.root;
    expect(instance.findByProps({ to: '/settings/user_settings' }.props.active)).toBe(true);

    tree = getComponent({ location: '/something_else' });
    instance = tree.root;
    expect(instance.findByProps({ to: '/something_else' }.props.active)).toBe(false);
  });
});
