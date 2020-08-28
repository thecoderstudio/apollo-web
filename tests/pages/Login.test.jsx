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
      authenticated: false,
      modalVisible: false,
      selectedArchitecture: "amd64",
      selectedOperatingSystem: "linux"
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
      target: {
        value: 'test'
      }
    });
    root.findByProps({ type: 'password' }).props.onChange({
      target: {
        value: 'password'
      }
    });
    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });

    await waitForExpect(() => {
      expect(instance.props.dispatch).toHaveBeenCalled();
    });
  });

  it("handles unsuccessful login", async () => {
    const component = getComponent(store);
    const root = component.root.findByProps({ authenticated: false });
    const instance = root.instance;

    axios.post.mockResolvedValue({
      status: 400
    });

    root.findByProps({ type: 'username' }).props.onChange({
      target: {
        value: 'test'
      }
    });
    root.findByProps({ type: 'password' }).props.onChange({
      target: {
        value: 'password'
      }
    });
    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });

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
    axios.get.mockResolvedValue({
      status: 500
    });

    root.findByProps({type: 'username'}).props.onChange({ target: {
      value: 'test'
    }});
    root.findByProps({type: 'password'}).props.onChange({ target: {
      value: 'password'
    }});
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
