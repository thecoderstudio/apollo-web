import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ModalOverlay from '../../../src/components/modals/ModalOverlay';


function getComponent(spy=jest.fn()) {
  return renderer.create(
    <ModalOverlay closeModalFunction={spy}>
      <div />
    </ModalOverlay>
  );
}

describe('ModalOverlay', () => {
  it('renders correctly', () => {
    expect(getComponent().toJSON()).toMatchSnapshot();
  });

  it('calls close function', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <ModalOverlay closeModalFunction={spy}>
        <div />
      </ModalOverlay>
    );
    wrapper.find('div').first().simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('does not call close function', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <ModalOverlay closeModalFunction={spy}>
        <div id='test' />
      </ModalOverlay>
    );
    wrapper.find('#test').simulate('click');
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
