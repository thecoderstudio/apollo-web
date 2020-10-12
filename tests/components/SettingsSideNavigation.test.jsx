import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
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
      location: { pathname: '/path' }
    }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
