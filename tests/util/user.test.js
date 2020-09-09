import axios from 'axios';
import waitForExpect from 'wait-for-expect';
import { StatusCodes } from 'http-status-codes';
import { fetchCurrentUser } from '../../src/util/user';
import { cacheCurrentUser } from '../../src/actions/current-user';

jest.mock('axios');

describe('user util', () => {
  it('fetches user correctly', async () => {
    axios.get.mockResolvedValue({
      status: StatusCodes.OK,
      data: {}
    });
    const spy = jest.fn();
    fetchCurrentUser(spy); 
    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(cacheCurrentUser({}));
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
    const spy = jest.fn();
    fetchCurrentUser(spy); 
    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
