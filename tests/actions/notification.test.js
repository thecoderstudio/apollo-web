import { severity, dismiss, notify } from '../../src/actions/notification';

test("notify creates a notify action with new id", () => {
  let expectedAction = {
    type: 'NOTIFY',
    id: 0,
    message: 'test',
    severity: severity.info
  };
  expect(notify('test', severity.info)).toEqual(expectedAction);

  expectedAction.id = 1;
  expect(notify('test', severity.info)).toEqual(expectedAction);
});

test("dismiss create a dismiss action", () => {
  const expectedAction = {
    type: 'DISMISS',
    id: 0
  };
  expect(dismiss(0)).toEqual(expectedAction);
});
