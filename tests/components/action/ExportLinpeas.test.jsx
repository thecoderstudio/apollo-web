import React from 'react';
import renderer from 'react-test-renderer';
import ExportLinpeas from '../../../src/components/action/ExportLinpeas';

function getComponent(onClose) {
  const agent = {
    name: 'test'
  }
  return renderer.create(
    <ExportLinpeas onClose={onClose} agent={agent} />
  );
}

describe("export linpeas", () => {
  it("renders correctly", () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });
});
