import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Action from '../../../src/components/action/Action';

describe("Action", () => {
  it("renders correctly", () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Action title="test title" className="verify">test</Action>
      </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
