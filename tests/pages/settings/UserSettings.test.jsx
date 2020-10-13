import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import UserSettings from '../../../src/pages/settings/UserSettings';
import { severity, notify as notifyAction } from '../../../src/actions/notification';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store, props) {
  let root;
  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <UserSettings {...props} />
        </BrowserRouter>
      </Provider>
    );
  });
  return root;
}

function updateField(input, name, value) {
  act(() => {
    input.props.onChange({
      currentTarget: {
        name,
        value
      }
    });
  });
}

function submitForm(component, username, oldPassword, password, passwordConfirm) {
  const usernameInput = component.root.findByProps({ placeholder: 'Username' });
  const oldPasswordInput = component.root.findByProps({ placeholder: 'Current password' });
  const passwordInput = component.root.findByProps({ placeholder: 'New password' });
  const passwordConfirmInput = component.root.findByProps({ placeholder: 'Confirm new password' });
  const form = component.root.findByType('form');

  updateField(usernameInput, 'username', username);
  updateField(oldPasswordInput, 'oldPassword', oldPassword);
  updateField(passwordInput, 'password', password);
  updateField(passwordConfirmInput, 'passwordConfirm', passwordConfirm);

  form.props.onSubmit({ preventDefault: jest.fn() });
}

async function testFormValidation(component, username, oldPassword, password, passwordConfirm) {
  submitForm(component, username, oldPassword, password, passwordConfirm);
  await new Promise(resolve => setImmediate(resolve));
  component.toJSON();
  const errors = component.root.findAllByProps({ id: 'error' });

  await waitForExpect(() => {
    expect(errors).not.toBe([]);
    expect(axios.patch).not.toHaveBeenCalled();
  });
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

  afterEach(() => {
    spy.mockClear();
  });

  it("render correctly", () => {
    expect(getComponent(store, props).toJSON()).toMatchSnapshot();
  });

  it('patch successfully', async () => {
    const component = getComponent(store, props);

    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {}
    });

    axios.patch.mockResolvedValue({
      status: StatusCodes.OK
    });

    await submitForm(component, 'username', 'oldpassword', 'password', 'password');
    component.toJSON();
    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(notifyAction("User data updated", severity.SUCCESS));
    });
  });

  it("validates input", async () => {
    const component = getComponent(store, props);
    await testFormValidation(component, 'username', 'oldPassword', 'passw', 'passw');
    await testFormValidation(component, 'username', 'oldPassword', 'passw');
    await testFormValidation(component, 'username', '', 'password', 'password');
    await testFormValidation(component, 'username', 'password', '', 'password');
    await testFormValidation(component, 'username', 'oldPassword', 'password1', 'password2');
  });

  it('handles unsuccessful patch', async () => {
    const component = getComponent(store, props);

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad request",
        data: {}
      }
    }));

    await submitForm(component, 'username', 'oldPassword', 'password', 'password');

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {}
      }
    }));

    await submitForm(component, 'username', 'oldPassword', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalledTimes(2);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
