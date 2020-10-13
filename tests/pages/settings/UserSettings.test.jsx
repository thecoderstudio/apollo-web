import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import UserSettings from '../../../src/pages/settings/UserSettings';
import { severity, notify as notifyAction } from '../../../src/actions/notification';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store, props) {
  return renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <UserSettings {...props} />
      </BrowserRouter>
    </Provider>
  );
}

function submitForm(root, username, oldPassword, password, passwordConfirm) {
  const usernameInput = root.findByProps({ placeholder: 'Username' });
  const oldPasswordInput = root.findByProps({ placeholder: 'Current password' });
  const passwordInput = root.findByProps({ placeholder: 'New password' });
  const passwordConfirmInput = root.findByProps({ placeholder: 'Confirm new password' });
  const form = root.findByType('form');

  usernameInput.props.onChange({
    currentTarget: {
      name: 'username',
      value: username
    }
  });

  oldPasswordInput.props.onChange({
    currentTarget: {
      name: 'oldPassword',
      value: oldPassword
    }
  });

  passwordInput.props.onChange({
    currentTarget: {
      name: 'password',
      value: password
    }
  });

  passwordConfirmInput.props.onChange({
    currentTarget: {
      name: 'passwordConfirm',
      value: passwordConfirm
    }
  });

  form.props.onSubmit();
}

describe("User settings", () => {
  let store;
  let spy;
  const props = {
    location: {
      pathname: '/path'
    }
  };

  beforeEach(() => {
    store = mockStore({
      currentUser: {
        username: 'admin'
      }
    });
    spy = jest.spyOn(store, 'dispatch');
  });

  it("render correctly", () => {
    expect(getComponent(store, props).toJSON()).toMatchSnapshot();
  });

  it('patch successfully', async () => {
    const component = getComponent(store, props);
    const { root } = component;

    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {}
    });

    axios.patch.mockResolvedValue({
      status: StatusCodes.OK
    });

    submitForm(root, 'username', 'oldpassword', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(notifyAction("User data updated", severity.SUCCESS));
    });
  });

  it("validates input", async () => {
    const component = getComponent(store, props);
    const { root } = component;

    submitForm(root, 'username', '', 'password', 'password');
    submitForm(root, 'username', 'oldPassword', 'passw', 'passw');
    submitForm(root, '', 'oldpassword', 'password1', 'password2');

    await waitForExpect(() => {
      expect(axios.patch).not.toHaveBeenCalled();
    });
  });

  it('handles unsuccessful patch', async () => {
    const component = getComponent(store, props);
    const { root } = component;

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad request",
        data: {}
      }
    }));

    submitForm(root, 'username', 'oldPassword', 'password', 'password');

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {}
      }
    }));

    submitForm(root, 'username', 'oldPassword', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalledTimes(2);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
