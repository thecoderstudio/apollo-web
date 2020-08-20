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
// jest.mock('../../src/lib/NewAgentHandler', () => ({
//     supportedArch: ['amd64', 'arm64', 'arm'],
//     upportedOS: ['linux', 'darwin', 'freebsd', 'openbsd']
// }));

function getComponent(store) {
  return renderer.create(
    <Provider store={store}>
      <AddAgentModal />
    </Provider>
  );
};

function getFinalPageComponent(store, buttonId) {
  const component = getComponent(store)
  const instance = component.root;
  instance.findByProps({ id: buttonId }).props.onClick();
  component.toJSON();
  instance.findByProps({ placeholder: '007' }).props.onChange({ target: {
    value: 'test'
  }});

  axios.post.mockResolvedValue({
    status: 200,
    data: { id: 'test', oauth_client: { secret: 'test' } }
  });

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
  })


  it('creates agent', async () => {
    const component = getFinalPageComponent(store, 'directlyButton');
    await waitForExpect(() => {
      expect(component.toJSON()).toMatchSnapshot();
    })
  });

  it('creates agent', async () => {
    const spy = jest.spyOn(NewAgentHandler.prototype, 'downloadFile').mockImplementation(() => { return });
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