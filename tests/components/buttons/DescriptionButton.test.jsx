import React from 'react';
import renderer from 'react-test-renderer';
import DescriptionButton from '../../../src/components/buttons/DescriptionButton';

function getComponent(props) {
  return renderer.create(
    <DescriptionButton {...props} />
  );
}

describe('DescriptionButton', () => {
  const spy = jest.fn();
  const props = { children: <div />, onClick: spy, title: 'title' };

  it("renders correctly", () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onClick correctly", () => {
    const instance = getComponent({ ...props, loading: true }).root;
    instance.findByType('button').props.onClick();
    expect(spy).toHaveBeenCalled();
  });
});
