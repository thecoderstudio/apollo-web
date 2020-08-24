import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import UserList from '../../src/components/user/UserList';

jest.mock('axios');

function getComponent() {
  return renderer.create(<UserList />);
}

describe("user list", () => {
  beforeEach(() => {
    process.env = {
      APOLLO_HTTP_URL: 'http://localhost:1234/'
    };
  });

  it("renders correctly", async () => {
    const users = [
      {
        username: 'test',
        role: null
      },
      {
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

    const component = getComponent()
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

    const component = getComponent()
    let tree = component.toJSON();

    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});
