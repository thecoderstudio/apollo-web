import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import Admin from '../../src/pages/Admin';

jest.mock('axios');

function getComponent() {
  return renderer.create(<Admin />);
}

describe("user list", () => {
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

    const component = getComponent();
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
