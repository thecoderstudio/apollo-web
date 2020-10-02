import React from 'react';
import renderer from 'react-test-renderer';
import Action from '../../../src/components/action/Action';

describe("Action", () => {
  it("renders correctly", () => {
    const tree = renderer.create(
      <Action title="test title" className="verify">test</Action>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
