import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import Login from '../../src/pages/Login';
import Button from '../../src/components/Button';

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
    process.env = {
      APOLLO_HTTP_URL: 'http://localhost:1234/'
    };
    store.dispatch = jest.fn();
  });

  it("renders correctly", () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful login", () => {
    const component = getComponent(store);
    const root = component.root.findByProps({authenticated: false});
    const instance = root.instance;

    axios.post.mockResolvedValue({
      status: 200
    });

    root.findByProps({type: 'username'}).props.onChange({ target: {
      value: 'test'
    }});
    root.findByProps({type: 'password'}).props.onChange({ target: {
      value: 'password'
    }});
    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });

    setTimeout(() => {
      expect(instance.props.dispatch).toHaveBeenCalled();
    }, 100);
  });

  it("handles unsuccessful login", () => {
    const component = getComponent(store);
    const root = component.root.findByProps({authenticated: false});
    const instance = root.instance;

    axios.post.mockResolvedValue({
      status: 400
    });

    root.findByProps({type: 'username'}).props.onChange({ target: {
      value: 'test'
    }});
    root.findByProps({type: 'password'}).props.onChange({ target: {
      value: 'password'
    }});
    root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });

    setTimeout(() => {
      expect(instance.props.dispatch).toNotHaveBeenCalled();
    }, 100);
  });

  it("correctly sets pathname on authentication", () => {
    const component = getComponent(store);
    const root = component.root.findByProps({authenticated: false});
    const instance = root.instance;

    instance.props = ({ authenticated: true });
    instance.componentDidUpdate();
    expect(window.location.pathname).toEqual("/");
  });
});
