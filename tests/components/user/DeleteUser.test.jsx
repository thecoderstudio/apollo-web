import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import DeleteUser from '../../../src/components/user/DeleteUser';
import { darkTheme } from '../../../src/theme';

jest.mock('axios');

function getComponent(user, callback, closeFunction) {
  return renderer.create(
    <DeleteUser theme={darkTheme} user={user} userDeleteCallback={callback} closeFunction={jest.fn()} />
  );
}

describe("Delete user", () => {
  const userDeleteCallback;
  const closeFunction;

  beforeEach(() => {
    userDeleteCallback = jest.fn();
    closeFunction = jest.fn();
  });

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
      expect(userDeleteCallback).toHaveBeenCalled();
      expect(closeFunction).toHaveBeenCalled();
    });
  });

  it("does not delete user", async () => {
    axios.delete.mockRejectedValue({
      status: 400,
      response: {
        data: {
          detail: "error"
        }
      }
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
      expect(spy).not.toHaveBeenCalled();
      expect(userDeleteCallback).toHaveBeenCalled();
    });
  });
});