import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NavBar from '../../src/components/NavBar';
import { logout as logoutAction } from '../../src/actions/auth';

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

describe('login', () => {
  let store;
  let spy;

  beforeEach(() => {
    store = mockStore({
      addAgent: {
        selectedArchitecture: 'amd64',
        selectedOperatingSystem: 'linux'
      },
      currentUser: {}
    });
    spy = jest.spyOn(store, 'dispatch');
  });

  it('renders correctly', () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles successful logout', async () => {
    const component = getComponent(store);
    const instance = component.root;
    instance.findByProps({ id: 'logoutButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledWith(logoutAction());
    });
  });

  it('handles add agent modal', async () => {
    const component = getComponent(store);
    const instance = component.root;
    instance.findByProps({ id: 'newAgentButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();
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
