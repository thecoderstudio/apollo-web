import React from 'react';
import renderer from 'react-test-renderer';
import OutlinedButton from '../../../src/components/buttons/OutlinedButton'

it('renders correctly', () => {
  const tree = renderer
    .create(<OutlinedButton>Test</OutlinedButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
