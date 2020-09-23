import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Dashboard from '../../src/pages/Dashboard';


const mockStore = configureStore([]);

const getComponent = (store) => {
  return renderer.create(
    <Provider store={store} >
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </Provider >
  ).toJSON();
};


describe('dashboard', () => {
  it("renders correctly", () => {
    const store = mockStore({
      agent: [],
      currentUser: {
        id: 'id',
        role: {
          name: 'admin'
        },
        hasChangedInitialPassword: false
      },
      authenticated: true,
    });
    expect(getComponent(store)).toMatchSnapshot();
  });

  it("Does not render change password", () => {
    const store = mockStore({
      agent: [],
      currentUser: {
        id: 'id',
        role: {
          name: 'admin'
        },
        hasChangedInitialPassword: true
      },
      authenticated: true,
    });
    expect(getComponent(store)).toMatchSnapshot();
  });
});
