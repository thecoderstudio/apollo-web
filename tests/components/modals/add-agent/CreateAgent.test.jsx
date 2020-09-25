import React from 'react';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import renderer from 'react-test-renderer';
import CreateAgent from '../../../../src/components/modals/add-agent/CreateAgent';
import NewAgentHandler from '../../../../src/lib/NewAgentHandler';

jest.mock('axios');

function getComponent(spy, callbackSpy) {
  return renderer.create(
    <CreateAgent onClose={spy} createAgentSuccessCallback={callbackSpy}/>
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
  let callbackSpy;

  beforeEach(() => {
    spy = jest.fn();
    callbackSpy = jest.fn();
  });

  it('renders correctly', () => {
    const tree = getComponent(spy, callbackSpy).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('closes modal correctly', async () => {
    const component = getComponent(spy, callbackSpy);
    const instance = component.root;
    instance.findByProps({ id: 'closeButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('validates input', async () => {
    const component= getComponent(spy, callbackSpy);
    const instance = component.root;

    submitForm(instance, '');
    submitForm(instance, new Array(102).join('x'));

    await waitForExpect(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  it('creates agent', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { id: 'test', oauth_client: { secret: 'test' } }
    });

    const component = getComponent(spy, callbackSpy);
    const instance = component.root;

    submitForm(instance, 'newAgent');

    await waitForExpect(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(callbackSpy).toHaveBeenCalled();
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

    axios.post.mockResolvedValue({
      status: 200,
      data: { id: 'test', oauth_client: { secret: 'test' } }
    });

    const component = getComponent(spy, callbackSpy);
    const instance = component.root;

    submitForm(instance, 'newAgent');

    axios.post.mockImplementationOnce(() => Promise.reject({
      response: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: "Something went wrong",
        data: {}
      }
    }));

    submitForm(instance, 'newAgent');

    await waitForExpect(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(callbackSpy).not.toHaveBeenCalled();
    });
  });

  it('Correctly sets architecure state', () => {
    const component = getComponent();
    const createAgentInstance = component.root.findByType(CreateAgent).instance;

    createAgentInstance.selectArchitecture('test');
    expect(createAgentInstance.state['selectedArchitecture']).toBe('test');
  });

  it('Correctly sets operating system state', () => {
    const component = getComponent();
    const createAgentInstance = component.root.findByType(CreateAgent).instance;

    createAgentInstance.selectOperatingSystem('test');
    expect(createAgentInstance.state['selectedOperatingSystem']).toBe('test');
  });
});