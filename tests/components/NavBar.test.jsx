import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NavBar, { NavBar as PlainNavBar } from '../../src/components/NavBar';
import { store as globalStore } from '../../src/store';
import { logout as logoutAction } from '../../src/actions/auth';
import { removeCurrentUser } from '../../src/actions/current-user';

const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  );
}

describe('navbar', () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    store = mockStore({
      currentUser: {}
    });
    dispatchSpy = jest.spyOn(globalStore, 'dispatch');
  });

  it('renders correctly', () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles successful logout', () => {
    const tree = getComponent(store);
    const instance = tree.root;
    instance.findByProps({ id: 'logoutButton' }).props.onClick();
    expect(dispatchSpy).toHaveBeenCalledWith(logoutAction());
    expect(dispatchSpy).toHaveBeenCalledWith(removeCurrentUser());
  });

  it('toggles collapsed', () => {
    const component = getComponent(store);
    const { root } = component;
    const toggle = root.findByProps({ id: 'collapseIcon' });
    const menu = root.findByType(PlainNavBar);
    toggle.props.onClick();
    component.toJSON();
    expect(menu.instance.state.collapsed).toBe(false);

    toggle.props.onClick();
    component.toJSON();
    expect(menu.instance.state.collapsed).toBe(true);
  });

  it('render admin link for admins', () => {
    store = mockStore({
      currentUser: {
        username: 'admin',
        role: {
          name: 'admin'
        }
      }
    });
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
