import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import UserList from '../../../src/components/user/UserList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('axios');
const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <UserList />
    </Provider>
  );
}

describe("user list", () => {
  const store = mockStore({
    currentUser: {
      id: 'id',
      role: {
        name: 'admin'
      }
    }
  });

  it("renders correctly", async () => {
    const users = [
      {
        id: 'id',
        username: 'test',
        role: null
      },
      {
        id: 'id2',
        username: 'admin',
        role: {
          name: 'admin'
        }
      }
    ];
    axios.get.mockResolvedValue({
      status: 200,
      data: users
    });

    const component = getComponent(store);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't try to render users on error", async () => {
    axios.get.mockResolvedValue({
      status: 500,
      data: { detail: "generic error" }
    });

    const component = getComponent(store);
    let tree = component.toJSON();

    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("correctly toggles create user", () => {
    const component = getComponent(store);
    const root = component.root;
    root.findByType('button').props.onClick();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    root.children[0].instance.closeCreateUser(false);

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("refreshes on create user success", async () => {
    const component = getComponent(store);
    const root = component.root;

    let tree = component.toJSON();
    const users = [{ username: 'test', role: null }];
    axios.get.mockResolvedValue({
      status: 200,
      data: users
    });
    root.children[0].instance.closeCreateUser(true);

    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
