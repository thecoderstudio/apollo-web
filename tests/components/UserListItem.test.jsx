import React from 'react';
import renderer from 'react-test-renderer';
import UserListItem from '../../src/components/user/UserListItem';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

function getComponent(user, store) {
  return renderer.create(
    <Provider store={store}>
      <UserListItem user={user} />
    </Provider>
  );
}

describe("user list item", () => {
  const store = mockStore({
    currentUser: {
      role: {
        id: 'id',
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
});
