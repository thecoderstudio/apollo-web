import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import { StatusCodes } from 'http-status-codes';
import { fetchCurrentUser } from '../../src/util/user';

jest.mock('axios');


describe('user util', () => {
  let mockDispatchSpy;
  beforeEach(() => {
    mockDispatchSpy = jest.fn();
    jest.mock('../../src/store', () => ({
      dispatch: mockDispatchSpy,
    }));
  });

  it('fetches user correctly', async () => {
    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {}
    });
    const callbackSpy = jest.fn();
    fetchCurrentUser(callbackSpy);
    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(callbackSpy).toHaveBeenCalled();
    });
  });

  it('handles unsuccessful call', async () => {
    axios.get.mockRejectedValue({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "bad request",
        data: {}
      }
    });
    const callbackSpy = jest.fn();
    fetchCurrentUser(callbackSpy);
    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(callbackSpy).not.toHaveBeenCalled();
    });
  });
});
