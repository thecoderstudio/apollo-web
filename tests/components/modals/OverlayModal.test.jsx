import React from 'react';
import renderer from 'react-test-renderer';
import ModalOverlay from '../../../src/components/modals/ModalOverlay';

function getComponent() {
  return renderer.create(
    <ModalOverlay>
      <div />
    </ModalOverlay>
  );
}

describe('ModalOverlay', () => {
  it('renders correctly', () => {
    expect(getComponent().toJSON()).toMatchSnapshot();
  });
});
