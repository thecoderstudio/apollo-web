import React from 'react';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import renderer from 'react-test-renderer';
import AddAgentModal from '../../../src/components/modals/AddAgentModal';
import NewAgentHandler from '../../../src/lib/NewAgentHandler';

const { act } = renderer

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store, spy=jest.fn()) {
  return renderer.create(
    <Provider store={store}>
      <AddAgentModal onClose={spy}/>
    </Provider>
  );
}

function getFinalPageComponent(store, buttonId) {
  const component = getComponent(store);
  const instance = component.root;
  instance.findByProps({ id: buttonId }).props.onClick();
  component.toJSON();

  submitForm(instance, 'test');
  return component;
}

function submitForm(root, name) {
  const nameInput = root.findByProps({ placeholder: '007' });
  const form = root.findByType('form');

  nameInput.props.onChange({ currentTarget : {
    name: 'name',
    value: name
  }});

  console.log(form.props);
  form.props.onSubmit();
}

describe('addAgentModal', () => {
  let store;
  let spy;

  beforeEach(() => {
    store = mockStore({
      addAgent: {
        selectedArchitecture: 'amd64',
        selectedOperatingSystem: 'linux'
      },
    });
    spy = jest.fn();
  });

  // it('renders correctly', () => {
  //   const tree = getComponent(store).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('selects directly correctly', () => {
  //   const component = getComponent(store);
  //   const instance = component.root;

  //   instance.findByProps({ id: 'directlyButton' }).props.onClick();
  //   expect(component.toJSON()).toMatchSnapshot();
  // });

  // it('selects manual correctly', () => {
  //   const component = getComponent(store);
  //   const instance = component.root;
  //   instance.findByProps({ id: 'manualButton' }).props.onClick();
  //   expect(component.toJSON()).toMatchSnapshot();
  // });

  // it('closes modal correctly', async () => {
  //   const component = getComponent(store, spy);
  //   const instance = component.root;
  //   instance.findByProps({ id: 'directlyButton' }).props.onClick();
  //   component.toJSON();
  //   instance.findByProps({ id: 'closeButton' }).props.onClick();
  //   expect(component.toJSON()).toMatchSnapshot();

  //   await waitForExpect(() => {
  //     expect(spy).toHaveBeenCalledTimes(1);
  //   });
  // });

  // it('validates input', async () => {
  //   const component = getComponent(store)
  //   const instance = component.root;
  //   instance.findByProps({ id: 'directlyButton' }).props.onClick();
  //   component.toJSON();

  //   submitForm(instance, '');
  //   submitForm(instance, new Array(102).join( 'x' ))

  //   await waitForExpect(() => {
  //     expect(axios.post).not.toHaveBeenCalled();
  //   });
  // });

  // it('creates agent', async () => {
  //   axios.post.mockResolvedValue({
  //     status: 200,
  //     data: { id: 'test', oauth_client: { secret: 'test' } }
  //   });

  //   const component = getFinalPageComponent(store, 'directlyButton');
  //   await waitForExpect(() => {
  //     expect(component.toJSON()).toMatchSnapshot();
  //   });
  // });

  it('create agent incorrect name error', async () => {
    axios.post.mockRejectedValue({
      status: 400,
      response: { data: { name: 'error' } }
    });

    const component = getFinalPageComponent(store, 'directlyButton');
    await waitForExpect(() => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  // it('calls download file correctly', async () => {
  //   axios.post.mockResolvedValue({
  //     status: 200,
  //     data: { id: 'test', oauth_client: { secret: 'test' } }
  //   });

  //   const spy = jest.spyOn(NewAgentHandler.prototype, 'downloadFile').mockImplementation(() => { return; });
  //   const component = getFinalPageComponent(store, 'manualButton');
  //   const instance = component.root;
  //   component.toJSON();

  //   axios.get.mockResolvedValue({
  //     status: 200,
  //     data: ''
  //   });

  //   await waitForExpect(() => {
  //     instance.findByProps({ id: 'downloadBinaryButton' }).props.onClick();
  //     expect(spy).toHaveBeenCalled();
  //   });
  // });
});