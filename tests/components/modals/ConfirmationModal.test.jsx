import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ConfirmationModal from '../../../src/components/modals/ConfirmationModal';

function getComponent(props) {
  return renderer.create(
    <Provider store={configureStore([])({})}>
      <ConfirmationModal {...props}  />
    </Provider>
  );
}

describe('ConfirmationModal', () => {
  const confirmSpy = jest.fn();
  const cancelSpy = jest.fn();
  const props = {
    title: 'title',
    confirmationCallback: confirmSpy,
    closeModalFunction: cancelSpy,
  };

  it('renders correctly', () => {
    expect(getComponent(props).toJSON()).toMatchSnapshot();
  });

  it('calls delete function', () => {
    const component = getComponent(props);
    component.root.findAllByType('button')[0].props.onClick();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('calls cancel button', () => {
    const component = getComponent(props);
    component.root.findAllByType('button')[1].props.onClick();
    expect(confirmSpy).toHaveBeenCalled();
  });
});