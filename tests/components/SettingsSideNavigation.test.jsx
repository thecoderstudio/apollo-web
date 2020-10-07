import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import SettingsSideNavigation from '../../src/components/SettingsSideNavigation';

const mockStore = configureStore([]);

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
    }
  });


  it('renders correctly', () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly check if path is active', () => {
    const tree = getComponent(props);
    const instance = tree.root;
    expect(instance.findByProps({ to: '/settings/user_settings' }.props.active)).toBe(true);

    const tree = getComponent({
      props = {
        location: '/something_else'
      }
    });
    const instance = tree.root;
    expect(instance.findByProps({ to: '/settings/user_settings' }.props.active)).toBe(false);
  });
});
