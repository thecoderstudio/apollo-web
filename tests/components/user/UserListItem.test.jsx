import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { Provider } from 'react-redux';
import waitForExpect from 'wait-for-expect'
import configureStore from 'redux-mock-store';
import UserListItem from '../../../src/components/user/UserListItem';
import { darkTheme } from '../../../src/theme';

jest.mock('axios');
const mockStore = configureStore([]);

function getComponent(user, store, callback=(() => {})) {
  return renderer.create(
    <Provider store={store}>
        <UserListItem theme={darkTheme} user={user} userDeleteCallback={callback} />
    </Provider>
  );
}

describe("user list item", () => {
  const store = mockStore({
    currentUser: {
      id: 'id',
      role: {
        name: 'admin'
      }
    }
  });
  const spy = jest.fn();
  it("render correctly without role", () => {
    const user = {
      username: 'test',
      role: null
    };
    const tree = getComponent(user, store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render correctly with role", () => {
    const user = {
      username: 'test',
      role: {
        name: 'admin'
      }
    };
    const tree = getComponent(user, store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("correctly opens confirmation modal", async () => {
    axios.delete.mockResolvedValue({
      status: 204
    });
    const user = {
      id: 'id2',
      role: {
        name: 'not admin'
      }
    };
    const tree = getComponent(user, store, spy);
    tree.root.findByType('button').props.onClick();
    tree.toJSON();
    tree.root.findAllByType('button')[2].props.onClick();
    await waitForExpect(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it("correctly cannot not remove user", () => {
    axios.delete.mockResolvedValue({
      status: 204
    });
    const user = {
      id: 'id2',
      role: {
        name: 'admin'
      }
    };
    const tree = getComponent(user, store, spy);
    expect(tree.root.findAllByType('button').length).toBe(0);
  });
});
