import configureStore from 'redux-mock-store';
import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../../src/pages/Dashboard';
import { Provider } from 'react-redux';

describe('dashboard', () => {
  it("renders correctly", () => {
    let mockStore = configureStore([]);
    const store = mockStore({
      collapsed: true,
      authenticated: true
    });

    const tree = renderer.create(
      <Provider store={store} >
        <Dashboard />
      </Provider >
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});