import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import Spinner from '../../src/components/Spinner';
import { darkTheme } from '../../src/theme';

test('Spinner renders correctly', () => {
  const tree = renderer
    .create(<ThemeProvider theme={darkTheme}><Spinner /></ThemeProvider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
