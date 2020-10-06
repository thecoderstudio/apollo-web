import React from 'react';
import renderer from 'react-test-renderer';
import AddAgentModal from '../../../../src/components/modals/add-agent/AddAgentModal';

function getComponent() {
  return renderer.create(
    <AddAgentModal onClose={jest.fn()} />
  );
}

describe('add Agent Modal', () => {
  it('renders correctly', () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders add agent correctly', () => {
    const component = getComponent();
    component.root.findByType(AddAgentModal).instance.setState(
      { manualUpload: true, agentCreated: true }
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('create agent success callback set state correctly', () => {
    const component = getComponent();
    const addAgentModalInstance = component.root.findByType(AddAgentModal).instance;

    addAgentModalInstance.createAgentSuccessCallback(
      {
        data: {
          id: 'id',
          oauth_client: { secret: 'secret' }
        }
      }, 'arch', 'op'
    );

    expect(JSON.stringify(addAgentModalInstance.state) === JSON.stringify({
      manualUpload: null,
      agentCreated: true,
      agentData: {
        agentId: 'id',
        secret: 'secret',
        selectedOperatingSystem: 'op',
        selectedArchitecture: 'arc'
      }
    })).toBe(true);
  });
});
