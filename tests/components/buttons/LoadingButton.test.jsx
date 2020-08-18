import React from 'react';
import renderer from 'react-test-renderer';
import LoadingButton from '../../../src/components/buttons/LoadingButton';

function getComponent(props) {
  return renderer.create(
    <LoadingButton {...props} />
  );
};

describe('LoadingButton', () => {
  const spy = jest.fn();
  let props = { loading: false, onClick: spy };

  it('renders correctly', () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows loading indicator', () => {
    const tree = getComponent({ ...props, loading: true }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows loading indicator', () => {
    const instance = getComponent({ ...props, loading: true }).root;
    instance.findByType('button').props.onClick();
    expect(spy).toHaveBeenCalled();
  });
});

