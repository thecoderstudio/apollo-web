import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../../src/components/Icon';

describe('icon', () => {
  it('renders active correctly', () => {
    const tree = renderer.create(<Icon active />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders inactive correctly', () => {
    const tree = renderer.create(<Icon active={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
