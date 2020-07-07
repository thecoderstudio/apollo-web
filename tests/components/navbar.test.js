import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import NavBar from '../../src/components/NavBar';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
}

describe('login', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authenticated: true,
      collapsed: true
    });
  
    store.dispatch = jest.fn();
  });

  it("renders correctly", () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles successful show options", () => {
    const component = getComponent(store);
    const root = component.root.findByProps({ 
        authenticated: true,
        collapsed: true
    });
    const instance = root.instance;

    // root.findByProps({onClick: 'username'}).props.onChange({ target: {
    //   value: 'test'
    // }});
    // root.findByProps({type: 'password'}).props.onChange({ target: {
    //   value: 'password'
    // }});
    // root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });

    // setTimeout(() => {
    //   expect(instance.props.dispatch).toHaveBeenCalled();
    // }, 100);
  });
});
