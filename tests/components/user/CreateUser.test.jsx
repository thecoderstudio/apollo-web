import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import CreateUser from '../../../src/components/user/CreateUser';

jest.mock('axios');

function getComponent(onClose) {
  return renderer.create(<CreateUser onClose={onClose} />);
}

describe("create user", () => {
  beforeEach(() => {
    process.env = {
      APOLLO_HTTP_URL: 'http://localhost:1234/'
    };
  })

  it("renders correctly", () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("cancels", async () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    axios.post.mockResolvedValue({
      status: 201
    });

    root.findByProps({type: 'username'}).props.onChange({ target: {
      value: 'test'
    }});
    root.findByProps({placeholder: 'Password'}).props.onChange({ target: {
      value: 'password'
    }});
    root.findByProps({placeholder: 'Confirm password'}).props.onChange({ target: {
      value: 'password'
    }});
    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });

    await waitForExpect(() => {
      expect(onClose).toHaveBeenCalledWith(true);
    });
  })
});
