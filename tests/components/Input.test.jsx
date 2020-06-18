import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../src/components/Input';

it('renders correctly', () => {
  const tree = renderer
    .create(<Input type="username" placeholder="username" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
