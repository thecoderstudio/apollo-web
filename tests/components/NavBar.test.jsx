import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NavBar from '../../src/components/NavBar';
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

describe('nav bar', () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    store = mockStore({
      currentUser: {}
    });
    dispatchSpy = jest.spyOn(globalStore, 'dispatch')
  });

  it("renders correctly", () => {
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful logout", () => {
    let tree = getComponent(store);
    const instance = tree.root;
    instance.findByProps({id: 'logoutButton'}).props.onClick();
    expect(dispatchSpy).toHaveBeenCalledWith(logoutAction());
    expect(dispatchSpy).toHaveBeenCalledWith(removeCurrentUser());
  });

  it("render admin link for admins", () => {
    store = mockStore({
      currentUser: {
        username: 'admin',
        role: {
          name: 'admin'
        }
      }
    });
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
