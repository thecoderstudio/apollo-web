import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserListItem from '../../../src/components/user/UserListItem';
import { darkTheme } from '../../../src/theme';

jest.mock('axios');
const mockStore = configureStore([]);

function getComponent(user, store) {
  return renderer.create(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <UserListItem  user={user} userDeleteCallback={() => {}} />
      </ThemeProvider>
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

  it("correctly opens modal", async () => {
    axios.delete.mockResolvedValue({
      status: 204
    });
    const user = {
      id: 'id2',
      role: {
        name: 'not admin'
      }
    };
    const tree = getComponent(user, store);
    tree.root.findByType('i').props.onClick();
    tree.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("correctly closes modal", async () => {
    axios.delete.mockResolvedValue({
      status: 204
    });
    const user = {
      id: 'id2',
      role: {
        name: 'not admin'
      }
    };
    const tree = getComponent(user, store);
    tree.root.findByType('i').props.onClick();
    tree.toJSON();
    tree.root.findAllByType('button')[0].props.onClick();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("correctly cannot not remove user", () => {
    const user = {
      id: 'id2',
      role: {
        name: 'admin'
      }
    };
    const tree = getComponent(user, store);
    expect(tree.root.findAllByType('i').length).toBe(0);
  });
});