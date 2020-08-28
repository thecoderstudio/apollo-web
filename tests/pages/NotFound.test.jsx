import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NotFound from '../../src/pages/NotFound';

test("not found renders correctly", () => {
  const tree = renderer.create(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
