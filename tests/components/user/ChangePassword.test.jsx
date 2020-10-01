import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import ChangePassword from '../../../src/components/user/ChangePassword';
import { logout as logoutAction } from '../../../src/actions/auth';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <ChangePassword />
    </Provider>
  );
}

function submitForm(root, oldPassword, password, passwordConfirm) {
  const oldPasswordInput = root.findByProps({ placeholder: 'Current password' });
  const passwordInput = root.findByProps({ placeholder: 'New password' });
  const passwordConfirmInput = root.findByProps({ placeholder: 'Confirm new password' });
  const form = root.findByType('form');

  oldPasswordInput.props.onChange({ currentTarget: {
    name: 'oldPassword',
    value: oldPassword
  }});

  passwordInput.props.onChange({ currentTarget: {
    name: 'password',
    value: password
  }});

  passwordConfirmInput.props.onChange({ currentTarget: {
    name: 'passwordConfirm',
    value: passwordConfirm
  }});

  form.props.onSubmit();
}

describe("change password", () => {
  let store;
  let spy;

  beforeEach(() => {
    store = mockStore({
      currentUser: {
        id: '1',
        hasChangedInitialPassword: false
      }
    });
    spy = jest.fn();
    jest.mock('../../src/store', () => ({
      dispatch: mockDispatchSpy,
    }));
  });

  it("renders correctly", () => {
    expect(getComponent(store).toJSON()).toMatchSnapshot();
  });

  it("validates input", async () => {
    const component = getComponent(store);
    const root = component.root;

    submitForm(root, '', 'password', 'password');
    submitForm(root, 'oldPassword', 'passw', 'passw');
    submitForm(root, 'oldpassword', 'password1', 'password2');

    await waitForExpect(() => {
      expect(axios.patch).not.toHaveBeenCalled();
    });
  });

  it('patch successfully', async () => {
    const component = getComponent(store);
    const root = component.root;

    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {}
    });

    axios.patch.mockResolvedValue({
      status: StatusCodes.OK
    });

    submitForm(root, 'oldpassword', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalled();
    });
  });

  it('handles unsuccessful patch', async () => {
    const component = getComponent(store);
    const root = component.root;

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad request",
        data: {}
      }
    }));

    submitForm(root, 'oldpassword', 'password', 'password');

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {}
      }
    }));

    submitForm(root, 'oldpassword', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalledTimes(2);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it("handles successful logout", async () => {
    let tree = getComponent(store);
    const instance = tree.root;
    instance.findByProps({id: 'logoutButton'}).props.onClick();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledWith(logoutAction());
    });
  });
});
