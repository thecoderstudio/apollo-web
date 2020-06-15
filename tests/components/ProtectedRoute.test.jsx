import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter, Switch } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';

const mockStore = configureStore([]);

describe('ProtectedRoute', () => {
  let store;
  let protectedRoute;

  beforeEach(() => {
    store = mockStore({
      auth: {authenticated: false}
    });
    protectedRoute = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute protectedRoute={<p>auth</p>} fallbackComponent={<p>unauth</p>} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders correctly', () => {
    const tree = protectedRoute.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly handles authenticated', () => {
    let tree = protectedRoute.toJSON();
    expect(tree).toMatchSnapshot()


    tree = protectedRoute.toJSON();
    expect(tree).toMatchSnapshot()


    tree = protectedRoute.toJSON();
    expect(tree).toMatchSnapshot()
  });
})
