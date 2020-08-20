import React from 'react';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import renderer from 'react-test-renderer';
import AddAgentModal from '../../src/components/AddAgentModal';
import { closeAddAgentModal, } from "../../src/actions/add-agent";
import NewAgentHandler from '../../src/lib/NewAgentHandler';

const mockStore = configureStore([]);
jest.mock('axios');

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <AddAgentModal />
    </Provider>
  );
}

function getFinalPageComponent(store, buttonId) {
  const component = getComponent(store);
  const instance = component.root;
  instance.findByProps({ id: buttonId }).props.onClick();
  component.toJSON();
  instance.findByProps({ placeholder: '007' }).props.onChange({ target: {
    value: 'test'
  }});

  instance.findByProps({ loading: false }).props.onClick();
  return component;
}

describe('addAgentModal', () => {
  let store;
  let spy;

  beforeEach(() => {
    store = mockStore({
      addAgent: {
        modalVisible: true,
        selectedArchitecture: 'amd64',
        selectedOperatingSystem: 'linux'
      },
    });
    spy = jest.spyOn(store, 'dispatch');
  });

  it('renders correctly', () => {
    const tree = getComponent(store).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('selects directly correctly', () => {
    const component = getComponent(store)
    const instance = component.root;

    instance.findByProps({ id: 'directlyButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('selects manual correctly', () => {
    const component = getComponent(store)
    const instance = component.root;
    instance.findByProps({ id: 'manualButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('closes modal correctly', async () => {
    const component = getComponent(store)
    const instance = component.root;
    instance.findByProps({ id: 'directlyButton' }).props.onClick();
    component.toJSON();
    instance.findByProps({ id: 'closeButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();

    await waitForExpect(() => {
      expect(spy).toHaveBeenCalledWith(closeAddAgentModal());
    });
  });

  it('check for empty agent name', () => {
    const component = getComponent(store)
    const instance = component.root;
    instance.findByProps({ id: 'directlyButton' }).props.onClick();
    component.toJSON();
    instance.findByProps({ loading: false }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('creates agent', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { id: 'test', oauth_client: { secret: 'test' } }
    });

    const component = getFinalPageComponent(store, 'directlyButton');
    await waitForExpect(() => {
      expect(component.toJSON()).toMatchSnapshot();
    })
  });

  it('creates agent incorrect name error', async () => {
    axios.post.mockRejectedValue({
      status: 400,
      response: { data: { name: 'error' } }
    });

    const component = getFinalPageComponent(store, 'directlyButton');

    await waitForExpect(async () => {
      expect(component.toJSON()).toMatchSnapshot();
      axios.post.mockRejectedValue({
        status: 400,
        response: { data: { somethingElse: 'error' } }
      });

      component.root.findByProps({ loading: false }).props.onClick();
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
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