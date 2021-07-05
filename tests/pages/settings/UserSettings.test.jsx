import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Formik } from 'formik';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import UserSettings, { UnconnectedUserSettings } from '../../../src/pages/settings/UserSettings';
import UpdateUserSchema from '../../../src/validation/user';

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
  const usernameInput = component.root.findByProps({
    placeholder: 'Username'
  });
  const oldPasswordInput = component.root.findByProps({
    placeholder: 'Current password'
  });
  const passwordInput = component.root.findByProps({
    placeholder: 'New password'
  });
  const passwordConfirmInput = component.root.findByProps({
    placeholder: 'Confirm new password'
  });
  const form = component.root.findByType('form');

  updateField(usernameInput, 'username', username);
  updateField(oldPasswordInput, 'oldPassword', oldPassword);
  updateField(passwordInput, 'password', password);
  updateField(passwordConfirmInput, 'passwordConfirm', passwordConfirm);

  form.props.onSubmit({
    preventDefault: jest.fn()
  });
}

async function validateInput(
  schema, username, oldPassword, password, passwordConfirm, expectedError
) {
  let error;
  await schema.validate({
    username,
    oldPassword,
    password,
    passwordConfirm
  }).catch(err => {
    error = err;
  });

  expect(error.message).toBe(expectedError);
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
    const root = component.root.findByType(UnconnectedUserSettings);
    const { instance } = root;
    const callbackSpy = jest.spyOn(instance, 'updateUserSuccessCallback');

    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {
      }
    });

    axios.patch.mockResolvedValue({
      status: StatusCodes.OK
    });

    submitForm(component, 'username', '', '', '');

    component.toJSON();
    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalled();
      expect(callbackSpy).toHaveBeenCalled();
    });
  });

  it("validates input", async () => {
    const component = getComponent(store, props);
    const schema = component.root.findByType(Formik).props.validationSchema;
    await validateInput(schema, 'username', 'oldPassword', 'passw', 'passw', 'Minimal 8 characters');
    await validateInput(schema, 'username', 'oldPassword', 'password', undefined, 'Confirm password is required when password is given');
    await validateInput(schema, 'username', 'password', '', 'password', 'Passwords must match');
    await validateInput(schema, 'username', 'oldPassword', 'password1', 'password2', 'Passwords must match');
  });

  it('handles unsuccessful patch', async () => {
    const component = getComponent(store, props);

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad request",
        data: {
        }
      }
    }));

    submitForm(component, 'username', 'oldPassword', 'password', 'password');

    axios.patch.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {
        }
      }
    }));

    submitForm(component, 'username', 'oldPassword', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.patch).toHaveBeenCalledTimes(2);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
