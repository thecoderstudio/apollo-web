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
      location: { pathname: '/path' }
    };
  });

  it('renders correctly', () => {
    let tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();

    tree = getComponent({
      location: { pathname: '/settings/user_settings' }
    }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly check if path matches', () => {
    const tree = getComponent(props);
    const instance = tree.root;
    const nav = instance.findByType(SettingsSideNavigation);

    expect(nav.instance.checkIfPathIsActive('/path')).toBe(true);
    expect(nav.instance.checkIfPathIsActive('/something_else')).toBe(false);
  });
});
