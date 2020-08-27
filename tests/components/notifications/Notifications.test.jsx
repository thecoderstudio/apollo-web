import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Map } from 'immutable';
import waitForExpect from 'wait-for-expect';
import { dismiss } from '../../../src/actions/notification';
import { darkTheme } from '../../../src/theme';
import Notifications from '../../../src/components/notifications/Notifications';

const mockStore = configureStore([]);

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <Notifications timeToLiveInSeconds={1} />
      </ThemeProvider>
    </Provider>
  );
}

describe('notifications', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: new Map({})
    });
  });

  it("renders correctly empty", () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders notifications and then dismisses them", async () => {
    store = mockStore({
      notifications: new Map({
        0: {
          message: "test 1",
          severity: 'info'
        },
        1: {
          message: "test 2",
          severity: 'warning'
        }
      })
    });
    store.dispatch = jest.fn();

    let tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();

    await waitForExpect(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      tree = getComponent(store).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
