import { Map } from 'immutable';
import { notify, dismiss } from '../../src/actions/notification';
import notificationReducer from '../../src/reducers/notification';

describe("notification reducer", () => {
  it("should return an empty map as initial state", () => {
    expect(notificationReducer(undefined, {})).toEqual(new Map({}));
  });

  it("should correctly handle notify action", () => {
    const notifications = notificationReducer(undefined, notify('test', 'info'));
    expect(notifications.get(0)).toEqual({ message: 'test', severity: 'info' });
  });

  it("should correctly handle dismiss action", () => {
    const notifications = new Map({
      "0": {
        message: 'test',
        severity: 'info'
      }
    });
    expect(notificationReducer(notifications, dismiss("0"))).toEqual(new Map({}));
  });
});
