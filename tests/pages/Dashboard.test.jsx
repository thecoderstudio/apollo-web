import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Dashboard from '../../src/pages/Dashboard';

describe('dashboard', () => {
  it("renders correctly", () => {
    let mockStore = configureStore([]);
    const store = mockStore({
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