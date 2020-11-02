import { downloadResponse } from '../../src/util/http';

describe('downloadResponse', () => {
  it("downloads the response with a name from header", () => {
    const link = {
      click: jest.fn()
    };
    const response = {
      headers: {
        'content-disposition': "attachment; filename=filename.jpg"
      },
      data: ''
    };

    jest.spyOn(document, "createElement").mockImplementation(() => link);
    global.URL.createObjectURL = jest.fn();
    downloadResponse(response);
    expect(link.download).toEqual('filename.jpg');
    expect(link.click).toHaveBeenCalledTimes(1);
  });

  it("downloads the response with a default filename", () => {
    const link = {
      click: jest.fn()
    };
    const response = {
      data: ''
    };

    jest.spyOn(document, "createElement").mockImplementation(() => link);
    global.URL.createObjectURL = jest.fn();
    downloadResponse(response);
    expect(link.download).toEqual('response');
    expect(link.click).toHaveBeenCalledTimes(1);
  });

  it("throws an exception when not giving a response", () => {
    const splitMock = jest.fn();
    splitMock.mockImplementation(() => { throw "test"; });
    const response = {
      headers: {
        'content-disposition': {
          split: splitMock
        }
      }
    };
    expect(() => { downloadResponse(response); }).toThrow("test");
  });

  it("downloads the response with a given name", () => {
    const link = {
      click: jest.fn()
    };
    const response = {
      data: ''
    };

    jest.spyOn(document, "createElement").mockImplementation(() => link);
    global.URL.createObjectURL = jest.fn();
    downloadResponse(response, 'apollo-agent.bin');
    expect(link.download).toEqual('apollo-agent.bin');
    expect(link.click).toHaveBeenCalledTimes(1);
  });
});
