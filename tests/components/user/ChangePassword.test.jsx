import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { prompedPasswordChange } from '../../../src/actions/change-password.js';
import ChangePassword from '../../../src/components/user/ChangePassword';
 
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

  console.log("SUBMITTING");
  form.props.onSubmit();
}

describe("change password", () => {
  let store;
  let spy;

  beforeEach(() => {
    store = mockStore({
      currentUser: {
        id: '1',
        has_changed_initial_password: false
      }
    });
    process.env = {
      APOLLO_HTTP_URL: 'http://localhost:1234/'
    };
    spy = jest.spyOn(store, 'dispatch');
  });

  it("renders correctly", () => {
    expect(getComponent(store).toJSON()).toMatchSnapshot();
  });

  it("skips changing password", async () => {
    const component = getComponent(store);
    const root = component.root;

    root.findAllByType('button')[1].props.onClick();
    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(prompedPasswordChange());
      expect(axios.put).not.toHaveBeenCalled();
    });
  });

  it("validates input", async () => {
    const component = getComponent(store);
    const root = component.root;

    submitForm(root, '', 'password', 'password');
    submitForm(root, 'oldPassword', 'passw', 'passw');
    submitForm(root, 'oldpassword', 'password1', 'password2');

    await waitForExpect(() => {
      expect(axios.put).not.toHaveBeenCalled();
    });
  });

  it('put successfully', async () => {
    const component = getComponent(store);
    const root = component.root;
    
    axios.put.mockResolvedValue({
      status: StatusCodes.OK
    });
    
    submitForm(root, 'oldpassword', 'password', 'password');

    await waitForExpect(() => { 
      expect(axios.put).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(prompedPasswordChange());
    })
  });

  it('handles unsuccessful put', async () => {
    const component = getComponent(store);
    const root = component.root;
    
    axios.put.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad request",
        data: {}
      }
    }));
    
    submitForm(root, 'oldpassword', 'password', 'password');


    axios.put.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {}
      }
    }));
    
    submitForm(root, 'oldpassword', 'password', 'password');

    await waitForExpect(() => {
      expect(axios.put).toHaveBeenCalledTimes(2);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
