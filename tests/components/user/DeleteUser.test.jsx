import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { Provider } from 'react-redux';
import waitForExpect from 'wait-for-expect';
import DeleteUser from '../../../src/components/user/DeleteUser'
import { darkTheme } from '../../../src/theme';

jest.mock('axios');

function getComponent(user, callback) {
  const func = jest.fn()
  return renderer.create(
    <DeleteUser theme={darkTheme} user={user} userDeleteCallback={callback} closeFunction={jest.fn()} />
  );
}

describe("Delete user", () => {
  const spy = jest.fn();

  it("correctly deletes user", async () => {
    axios.delete.mockResolvedValue({
      status: 204
    });
    const user = {
      id: 'id2',
      role: {
        name: 'not admin'
      }
    };
    const tree = getComponent(user, spy);
    tree.root.findAllByType('button')[1].props.onClick();
    await waitForExpect(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
})