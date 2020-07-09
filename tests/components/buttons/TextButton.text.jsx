import React from 'react';
import renderer from 'react-test-renderer';
import TextButton from '../../src/components/buttons/TextButton';

it('renders correctly', () => {
  const tree = renderer
    .create(<TextButton>Test</TextButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
