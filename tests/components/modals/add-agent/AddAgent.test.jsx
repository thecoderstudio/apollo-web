import React from 'react';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import renderer from 'react-test-renderer';
import AddAgent from '../../../../src/components/modals/add-agent/AddAgent';
import NewAgentHandler from '../../../../src/lib/NewAgentHandler';

jest.mock('axios');

function getComponent(spy, manualUpload=false) {
  return renderer.create(
    <AddAgent
      onClose={spy}
      manualUpload={manualUpload}
      selectedArchitecture='test'
      selectedOperatingSystem='test'
    />
  );
}

describe('Add Agent', () => {
  let spy;
  let callbackSpy;

  beforeEach(() => {
    spy = jest.fn();
    callbackSpy = jest.fn();
  });

  it('renders correctly', () => {
    let tree = getComponent(spy).toJSON();
    expect(tree).toMatchSnapshot();

    tree = getComponent(spy, true).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('closes modal correctly', async () => {
    const component = getComponent(spy);
    const instance = component.root;
    instance.findByProps({ id: 'closeButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('calls download file correctly after successful get', async () => {
    const component = getComponent(spy, true);
    const downloadFileSpy = jest.spyOn(NewAgentHandler.prototype, 'downloadFile').mockImplementation(() => { return; });

    axios.get.mockResolvedValue({
      status: 200,
      data: ''
    });
    component.root.findByProps({ id: 'downloadBinaryButton' }).props.onClick();

    await waitForExpect(() => {
      expect(downloadFileSpy).toHaveBeenCalled();
    });
  });

   it('Does not call download file on error', async () => {
      const component = getComponent(spy, true);
      const downloadFileSpy = jest.spyOn(NewAgentHandler.prototype, 'downloadFile').mockImplementation(() => { return; });

      axios.get.mockRejectedValue({
        status: 400,
        response: {
          data: {}
        }
      });

      component.root.findByProps({ id: 'downloadBinaryButton' }).props.onClick();

      await waitForExpect(() => {
        expect(downloadFileSpy).not.toHaveBeenCalled();
      });
    });
});