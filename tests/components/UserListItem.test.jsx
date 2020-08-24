import React from 'react';
import renderer from 'react-test-renderer';
import UserListItem from '../../src/components/user/UserListItem';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

function getComponent(user, store, callback=(() => {})) {
  return renderer.create(
    <Provider store={store}>
      <UserListItem user={user} userDeleteCallback={callback} />
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

  it("correctly removes user", () => {
    const spy = jest.fn();
    const user = {
      id: 'id2',
      role: {
        name: 'not admin'
      }
    };
    const tree = getComponent(user, store, spy);
    tree.root.findByType('button').props.onClick();
    expect(spy).toHaveBeenCalled();
  })
});
