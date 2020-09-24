import React from 'react';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import renderer from 'react-test-renderer';
import CreateAgent from '../../../src/components/modals/agg-agent/CreateAgent';
import NewAgentHandler from '../../../../src/lib/NewAgentHandler';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store, spy=jest.fn()) {
  return renderer.create(
    <CreateAgent onClose={spy}/>
  );
}

function submitForm(root, name) {
  const nameInput = root.findByProps({ placeholder: '007' });
  const form = root.findByType('form');

  nameInput.props.onChange({ currentTarget : {
    name: 'name',
    value: name
  }});

  form.props.onSubmit();
}

describe('create Agent', () => {
  let spy;

  it('renders correctly', () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('closes modal correctly', async () => {
    const component = getComponent(store, spy);
    const instance = component.root;
    instance.findByProps({ id: 'directlyButton' }).props.onClick();
    component.toJSON();
    instance.findByProps({ id: 'closeButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('validates input', async () => {
    const component = getComponent(store);
    const instance = component.root;
    instance.findByProps({ id: 'directlyButton' }).props.onClick();
    component.toJSON();

    submitForm(instance, '');
    submitForm(instance, new Array(102).join( 'x' ));

    await waitForExpect(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  it('creates agent', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { id: 'test', oauth_client: { secret: 'test' } }
    });

    const component = getFinalPageComponent(store, 'directlyButton');
    await waitForExpect(() => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it('handle unsuccesful post', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.BAD_REQUEST,
        statusText: "Bad request",
        data: {}
      }
    }));

    getFinalPageComponent(store, 'directlyButton');

    axios.post.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {}
      }
    }));

    getFinalPageComponent(store, 'directlyButton');

    await waitForExpect(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
    });
  });

  it('calls download file correctly', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { id: 'test', oauth_client: { secret: 'test' } }
    });

    const spy = jest.spyOn(NewAgentHandler.prototype, 'downloadFile').mockImplementation(() => { return; });
    const component = getFinalPageComponent(store, 'manualButton');
    const instance = component.root;
    component.toJSON();

    axios.get.mockResolvedValue({
      status: 200,
      data: ''
    });

    await waitForExpect(() => {
      instance.findByProps({ id: 'downloadBinaryButton' }).props.onClick();
      expect(spy).toHaveBeenCalled();
    });
  });
});