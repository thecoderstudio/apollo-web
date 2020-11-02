import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import waitForExpect from 'wait-for-expect';
import ExportLinpeas from '../../../src/components/action/ExportLinpeas';
import * as HTTP from '../../../src/util/http';

jest.mock('axios');

function getComponent(onClose) {
  const agent = {
    name: 'test'
  }
  return renderer.create(
    <ExportLinpeas onClose={onClose} agent={agent} />
  );
}

function submitForm(root, filename=null, ansi=false) {
  const filenameInput = root.findByProps({name: 'filename'});
  const ansiSwitch = root.findByProps({checked: false});
  const form = root.findByType('form');

  filenameInput.props.onChange({ currentTarget: {
    name: 'filename',
    vcalue: filename
  }});
  ansiSwitch.props.onChange(ansi);
  form.props.onSubmit();
}

describe("export linpeas", () => {
  it("renders correctly", () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("downloads successfully", async () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    HTTP.downloadResponse = jest.fn();
    axios.get.mockResolvedValue({
      status: StatusCodes.OK
    });

    submitForm(root);
    await waitForExpect(() => {
      expect(onClose).toHaveBeenCalled();
      expect(HTTP.downloadResponse).toHaveBeenCalled();
    });
  });

  it("handles input failure", async () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    axios.get.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad request",
        data: {
          filename: 'Wrong filename'
        }
      }
    }));

    submitForm(root);
    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it("handler generic failure", async () => {
    const onClose = jest.fn();
    const component = getComponent(onClose);
    const root = component.root;

    axios.get.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Server error",
        data: {}
      }
    }));

    submitForm(root);
    await waitForExpect(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
