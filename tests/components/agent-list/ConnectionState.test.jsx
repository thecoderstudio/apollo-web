import React from 'react';
import renderer from 'react-test-renderer';
import ConnectionState from '../../../src/components/agent-list/ConnectionState';

function getComponent(state) {
  return renderer.create(
    <ConnectionState connectionState={state} />
  );
}

describe("connectionState", () => {
  it("renders correctly", () => {
    const tree = getComponent("connected").toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Gets correct color", () => {
    let tree = getComponent("blanko").toJSON();
    expect(tree).toMatchSnapshot();
    tree = getComponent("disconnected").toJSON();
    expect(tree).toMatchSnapshot();
    tree = getComponent("connecting").toJSON();
    expect(tree).toMatchSnapshot();
    tree = getComponent("connected").toJSON();
    expect(tree).toMatchSnapshot();
  });
});

