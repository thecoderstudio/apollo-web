import React from 'react';
import renderer from 'react-test-renderer';
import DownloadAgentChoice from '../../../src/components/modals/add-agent/DownloadAgentChoice';

function getComponent(spy) {
  return renderer.create(
    <DownloadAgentChoice setManualUploadCallback={spy} />
  );
}

describe("download agent choice", () => {
  let spy;

  beforeEach(() => {
    spy = jest.fn();
  });

  it("renders correctly", () => {
    const tree = getComponent(spy).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("selects directly correctly", () => {
    const component = getComponent(spy);
    const instance = component.root;

    instance.findByProps({ id: 'directlyButton' }).props.onClick();

    expect(spy).toHaveBeenCalledWith(false);
  });

  it("selects manual correctly", () => {
    const component = getComponent(spy);
    const instance = component.root;

    instance.findByProps({ id: 'manualButton' }).props.onClick();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
