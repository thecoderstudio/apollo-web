import React from 'react';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import renderer from 'react-test-renderer';
import AddAgentModal from '../../../../src/components/modals/add-agent/AddAgentModal';
import NewAgentHandler from '../../../../src/lib/NewAgentHandler';

jest.mock('axios');

function getComponent() {
  return renderer.create(
    <AddAgentModal onClose={jest.fn()} />
  );
}

describe('add Agent Modal', () => {
  let spy;

  beforeEach(() => {
    spy = jest.fn();
  });

  it('renders correctly', () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('selects directly correctly', () => {
    const component = getComponent();
    const instance = component.root;

    instance.findByProps({ id: 'directlyButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('selects manual correctly', () => {
    const component = getComponent();
    const instance = component.root;

    instance.findByProps({ id: 'manualButton' }).props.onClick();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders add agent correctly', () => {
    const component = getComponent();
    component.root.findByType(AddAgentModal).instance.setState({manualUpload: true, agentCreated: true});
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('create agent success callback set state correctly', () => {
    const component = getComponent();
    const addAgentModalInstance = component.root.findByType(AddAgentModal).instance;

    addAgentModalInstance.createAgentSuccessCallback(
      {
        data: {
          id: 'id',
          'oauth_client': {secret: 'secret'}
        }
      },'test', 'test'
    );

    expect(JSON.stringify(addAgentModalInstance.state) ===  JSON.stringify({
      manualUpload: null,
      agentCreated: true,
			agentId: 'id',
      secret: 'secret',
      selectedOperatingSystem: 'test',
      selectedArchitecture: 'test'
    })).toBe(true);
  });
});