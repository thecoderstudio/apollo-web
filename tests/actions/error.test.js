import { store } from '../../src/store';
import { handleError, handleHTTPResponse } from '../../src/actions/error';
import { severity } from '../../src/actions/notification';

describe("handleError", () => {
  it("notifies of error", () => {
    const spy = jest.spyOn(store, 'dispatch');
    const expectedAction = {
      type: 'NOTIFY',
      id: 0,
      message: 'test',
      severity: severity.ERROR
    };
    handleError('test');
    expect(spy).toHaveBeenCalledWith(expectedAction);
  });

  it("doesn't notify of error if not required", () => {
    const spy = jest.spyOn(store, 'dispatch');
    handleError('test', false);
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("handleHTTPResponse", () => {
  it("notifies of unsuccessful response", () => {
    const spy = jest.spyOn(store, 'dispatch');
    const expectedAction = {
      type: 'NOTIFY',
      id: 1,
      message: "bad request",
      severity: severity.ERROR
    };
    const response = { status: 400, statusText: "bad request" };
    expect(handleHTTPResponse(response)).toEqual(false);
    expect(spy).toHaveBeenCalledWith(expectedAction);
  });

  it("notifies of unsuccessful response wit herror detail", () => {
    const spy = jest.spyOn(store, 'dispatch');
    const expectedAction = {
      type: 'NOTIFY',
      id: 2,
      message: "error",
      severity: severity.ERROR
    };
    const response = { status: 400, detail: "error", statusText: "bad request" };
    expect(handleHTTPResponse(response)).toEqual(false);
    expect(spy).toHaveBeenCalledWith(expectedAction);
  });

  it("doesn't notify of unsuccessful response if not required", () => {
    const spy = jest.spyOn(store, 'dispatch');
    const response = { status: 400, statusText: "bad request" };
    expect(handleHTTPResponse(response, false)).toEqual(false);
    expect(spy).not.toHaveBeenCalled();
  });

  it("doesn't notify bad requests if allowed", () => {
    const spy = jest.spyOn(store, 'dispatch');
    const response = { status: 400, statusText: "bad request" };
    expect(handleHTTPResponse(response, true, true)).toEqual(false);
    expect(spy).not.toHaveBeenCalled();
  });

  it("correctly handles successful responses", () => {
    const spy = jest.spyOn(store, 'dispatch');
    const response = { status: 200, statusText: "OK" };
    expect(handleHTTPResponse(response)).toEqual(true);
    expect(spy).not.toHaveBeenCalled();
  });
});
