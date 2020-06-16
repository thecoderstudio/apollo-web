import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Login from '../../src/pages/Login';
import Button from '../../src/components/Button';

const mockStore = configureStore([]);

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
      auth: {authenticated: false}
    });
    process.env = {
      APOLLO_URL: 'http://localhost:1234'
    }
  });

  it("renders correctly", () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful login", () => {
    const component = getComponent(store)
    const root = component.root.findByProps({authenticated: false})
    const instance = root.instance
    instance.setState({
      username: 'test',
      password: 'test'
    });
    root.findByType('form').props.onSubmit();
  });
});
