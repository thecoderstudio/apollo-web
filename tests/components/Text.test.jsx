import React from 'react';
import renderer from 'react-test-renderer';
import { Text, SmallText } from '../../../src/components/Text';

it('Text renders correctly', () => {
  const tree = renderer
    .create(<Text>Test</Text>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('SmallText renders correctly', () => {
    const tree = renderer
      .create(<SmallText>Test</SmallText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
