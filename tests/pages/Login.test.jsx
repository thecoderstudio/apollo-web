import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import Login from '../../src/pages/Login';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

describe('login', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authenticated: false
    });
    store.dispatch = jest.fn();
  });

  it("renders correctly", () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful login", async () => {
    const component = getComponent(store);
    const root = component.root.findByProps({ authenticated: false });
    const instance = root.instance;

    axios.post.mockResolvedValue({
      status: 200
    });
    axios.get.mockResolvedValue({
      status: 200
    });

    root.findByProps({ type: 'username' }).props.onChange({
      currentTarget: {
        name: 'username',
        value: 'test'
      }
    });
    root.findByProps({ type: 'password' }).props.onChange({
      currentTarget: {
        name: 'password',
        value: 'password'
      }
    });
    root.findByType('form').props.onSubmit();

    await waitForExpect(() => {
      expect(instance.props.dispatch).toHaveBeenCalled();
    });
  });

  it("handles unsuccessful login", async () => {
    const component = getComponent(store);
    const root = component.root.findByProps({ authenticated: false });
    const instance = root.instance;

    axios.post.mockImplementationOnce(() => Promise.reject({
      response: {
        status: 400,
        statusText: "Bad request",
        data: {}
      }
    }));

    root.findByProps({ type: 'username' }).props.onChange({
      currentTarget: {
        name: 'username',
        value: 'test'
      }
    });
    root.findByProps({ type: 'password' }).props.onChange({
      currentTarget: {
        name: 'password',
        value: 'password'
      }
    });
    root.findByType('form').props.onSubmit();

    await waitForExpect(() => {
      expect(instance.props.dispatch).not.toHaveBeenCalled();
    });
  });

  it("handler get current user failure", async () => {
    const component = getComponent(store);
    const root = component.root.findByProps({authenticated: false});
    const instance = root.instance;

    axios.post.mockResolvedValue({
      status: 200
    });
    axios.get.mockImplementationOnce(() => Promise.reject({
      response: {
        status: 500,
        statusText: "Something went wrong",
        data: {}
      }
    }));


    root.findByProps({type: 'username'}).props.onChange({ 
      currentTarget: {
        name: 'username',
        value: 'test'
      }
    });
    root.findByProps({type: 'password'}).props.onChange({
      currentTarget: {
        name: 'password',
        value: 'password'
      }
    });
    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });

    await waitForExpect(() => {
      expect(instance.props.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it("correctly sets pathname on authentication", () => {
    const component = getComponent(store);
    const root = component.root.findByProps({ authenticated: false });
    const instance = root.instance;

    instance.props = ({ authenticated: true });
    instance.componentDidUpdate();
    expect(window.location.pathname).toEqual("/");
  });
});
