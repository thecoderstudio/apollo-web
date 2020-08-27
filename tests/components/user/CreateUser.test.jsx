import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import CreateUser from '../../../src/components/user/CreateUser';

jest.mock('axios');

function getComponent(onClose) {
  return renderer.create(<CreateUser onClose={onClose} />);
}

function submitForm(root, username, password, confirmPassword) {
  const usernameInput = root.findByProps({type: 'username'});
  const passwordInput = root.findByProps({placeholder: 'Password'});
  const confirmPasswordInput = root.findByProps({placeholder: 'Confirm password'});
  const form = root.findByType('form');

  usernameInput.props.onChange({ target: { value: username }});
  passwordInput.props.onChange({ target: { value: password }});
  confirmPasswordInput.props.onChange({ target: { value: confirmPassword }});
  form.props.onSubmit({ preventDefault: jest.fn() });
}

describe("create user", () => {
  beforeEach(() => {
    process.env = {
      APOLLO_HTTP_URL: 'http://localhost:1234/'
    };
  });

  it("renders correctly", () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("cancels", () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    root.findAllByType('button')[0].props.onClick();
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it("validates input", async () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    submitForm(root, '', 'password', 'password');
    submitForm(root, 'test', 'pass', 'pass');
    submitForm(root, 'test', 'password', 'password2');

    await waitForExpect(() => {
      expect(axios.post).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalledWith(true);
    });
  });

  it("posts successfully", async () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    axios.post.mockResolvedValue({
      status: 201
    });

    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
    submitForm(root, 'test', 'password', 'password');

    await waitForExpect(() => {
      expect(onClose).toHaveBeenCalledWith(true);
    });
  });

  it("handles unsuccessful post", async () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    axios.post.mockResolvedValue({
      status: 400
    });

    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
    submitForm(root, 'test', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalledWith(true);
    });
  });
});
