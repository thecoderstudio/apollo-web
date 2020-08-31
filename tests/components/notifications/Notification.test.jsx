import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import waitForExpect from 'wait-for-expect';
import { severity as severityLevel, dismiss } from '../../../src/actions/notification';
import { darkTheme } from '../../../src/theme';
import Notification from '../../../src/components/notifications/Notification';

const mockStore = configureStore([]);

function getComponentTags(store, id, message, ttl=null, severity=severityLevel.info) {
  return (
    <Provider store={store}>
      <Notification id={id} message={message} theme={darkTheme} timeToLiveInSeconds={ttl} severity={severity} />
    </Provider>
  );
}

function getComponent(store, id, message, ttl=null, severity=severityLevel.info) {
  return renderer.create(getComponentTags(store, id, message, ttl, severity));
}

describe('notification', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("renders correctly for different severity levels", () => {
    let tree = getComponent(store, 0, 'test').toJSON();
    expect(tree).toMatchSnapshot();

    tree = getComponent(store, 0, 'test', null, severityLevel.warning).toJSON();
    expect(tree).toMatchSnapshot();

    tree = getComponent(store, 0, 'test', null, severityLevel.error).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("is dismissable using click", () => {
    const component = getComponent(store, 0, 'test'); 
    const icon = component.root.findByType('i');
    icon.props.onClick();

    expect(store.dispatch).toBeCalledWith(dismiss(0));
  });

  it("dismisses if TTL has expired", async () => {
    const component = getComponent(store, 0, 'test', 1); 
    const tree = component.toJSON();
    await waitForExpect(() => {
      expect(store.dispatch).toHaveBeenCalledWith(dismiss(0));
    });
  });

  it("correctly updates TTL", async () => {
    const component = getComponent(store, 0, 'test', 2); 
    let tree = component.toJSON();
    component.update(getComponentTags(store, 0, 'test', null));
    tree = component.toJSON();

    await waitForExpect(() => {
      expect(store.dispatch).not.toHaveBeenCalledWith(dismiss(0));
    });

    component.update(getComponentTags(store, 0, 'test', 1));
    tree = component.toJSON();
    component.update(getComponentTags(store, 0, 'test', 1, severityLevel.warning));
    tree = component.toJSON();

    await waitForExpect(() => {
      expect(store.dispatch).toHaveBeenCalledWith(dismiss(0));
    });
  });
});
