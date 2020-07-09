import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../../src/components/buttons/Button';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button>Test</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
