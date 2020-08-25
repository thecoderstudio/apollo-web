import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Modal from '../../../src/components/modals/Modal';


function getComponent(props) {
  return renderer.create(
    <Provider store={configureStore([])({})}>
      <Modal {...props}  />
    </Provider>
  );
}

describe('Modal', () => {
  const props = {
    children: <div />,
    title: 'title',
  };

  it('renders correctly', () => {
    expect(getComponent(props).toJSON()).toMatchSnapshot();
  });
});