import React from 'react';
import renderer from 'react-test-renderer';
import UserListItem from '../../../src/components/user/UserListItem';

function getComponent(user) {
  return renderer.create(
    <UserListItem user={user} />
  );
}

describe("user list item", () => {
  it("render correctly without role", () => {
    const user = {
      username: 'test',
      role: null
    };
    const tree = getComponent(user).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render correctly with role", () => {
    const user = {
      username: 'test',
      role: {
        name: 'admin'
      }
    };
    const tree = getComponent(user).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
