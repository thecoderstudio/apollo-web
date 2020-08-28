import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';

const mockStore = configureStore([]);

function getComponent(store, role=undefined) {
  return renderer.create(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: '/', key: 'testKey' }]}
      >
        <ProtectedRoute exact path='/' component="auth" fallbackComponent="unauth" role={role} />
      </MemoryRouter>
    </Provider>
  );
}


describe('ProtectedRoute', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authenticated: false
    });
  });

  it('renders correctly', () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly handles authenticated', () => {
    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();

    store = mockStore({
      authenticated: true
    });

    tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('correctly handlers matching roles', () => {
    store = mockStore({
      authenticated: true,
      currentUser: {
        username: 'admin',
        role: {
          name: 'admin'
        }
      }
    });

    const tree = getComponent(store, 'admin').toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('disallows non-matching roles', () => {
     store = mockStore({
      authenticated: true,
      currentUser: {
        username: 'admin',
        role: null
      }
    });

    const tree = getComponent(store, 'admin').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
