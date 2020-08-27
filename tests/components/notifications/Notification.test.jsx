import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { darkTheme } from '../../../src/theme';
import Notification from '../../../src/components/notifications/Notification';

const mockStore = configureStore([]);

function getComponent(store, id, message) {
  return renderer.create(
    <Provider store={store}>
      <Notification id={id} message={message} theme={darkTheme} />
    </Provider>
  );
}

describe('notification', () => {
  let store;

  beforeEach(() => {
    store = mockStore({

    });
    store.dispatch = jest.fn();
  });

  it("renders correctly", () => {
    const tree = getComponent(store, 0, 'test').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
