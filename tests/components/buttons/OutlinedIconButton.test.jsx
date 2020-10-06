import React from 'react';
import renderer from 'react-test-renderer';
import OutlinedIconButton from '../../../src/components/buttons/OutlinedIconButton';

function getComponent(props) {
  return renderer.create(
    <OutlinedIconButton {...props} />
  );
}

describe('OutlinedIconButton', () => {
  const spy = jest.fn();
  let props = { children: <div/>, onClick: spy, iconClassName: "fa-plus" };

  it('renders correctly', () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick correctly', () => {
    const instance = getComponent({ ...props }).root;
    instance.findByType('button').props.onClick();
    expect(spy).toHaveBeenCalled();
  });
});