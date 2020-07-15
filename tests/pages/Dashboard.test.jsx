import configureStore from 'redux-mock-store';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Dashboard from '../../src/pages/Dashboard';
import { Provider } from 'react-redux';

describe('dashboard', () => {
  it("renders correctly", () => {
    let mockStore = configureStore([]);
    const store = mockStore({
<<<<<<< HEAD
      agent: [],
      authenticated: true
    });
    process.env = {
      APOLLO_WS_URL: 'ws://localhost:1234/'
    };
    
=======
      authenticated: true
    });
>>>>>>> 9ad8408a9a4fd36cab9c9d596b43a841fad6006e

    const tree = renderer.create(
      <Provider store={store} >
        <Dashboard />
      </Provider >
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});