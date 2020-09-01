import { Map } from 'immutable';
import { severity, notify, dismiss } from '../../src/actions/notification';
import notificationReducer from '../../src/reducers/notification';

describe("notification reducer", () => {
  it("should return an empty map as initial state", () => {
    expect(notificationReducer(undefined, {})).toEqual(new Map({}));
  });

  it("should correctly handle notify action", () => {
    const notifications = notificationReducer(undefined, notify('test', severity.INFO));
    expect(notifications.get(0)).toEqual({ message: 'test', severity: severity.INFO});
  });

  it("should correctly handle dismiss action", () => {
    const notifications = new Map({
      "0": {
        message: 'test',
        severity: severity.INFO
      }
    });
    expect(notificationReducer(notifications, dismiss("0"))).toEqual(new Map({}));
  });
});
