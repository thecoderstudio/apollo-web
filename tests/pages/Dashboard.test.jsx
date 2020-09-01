import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Dashboard from '../../src/pages/Dashboard';

describe('dashboard', () => {
  it("renders correctly", () => {
    let mockStore = configureStore([]);
    const store = mockStore({
      authenticated: true,
      addAgent: {
        selectedArchitecture: "amd64",
        selectedOperatingSystem: "linux"
      },
      agent: [],
      currentUser: {
        id: 'id',
        role: {
          name: 'admin'
        }
      },
      authenticated: true
    });

    const tree = renderer.create(
      <Provider store={store} >
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider >
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
