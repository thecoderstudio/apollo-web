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
});