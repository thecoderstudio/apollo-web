import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import ConnectionState from '../../../src/components/connection-state/ConnectionState';
import { darkTheme } from '../../../src/theme';

function getComponent(state) {
  return renderer.create(
    <ThemeProvider theme={darkTheme} >
      <ConnectionState connectionState={state} />
    </ThemeProvider>
  );
}

describe("connectionState", () => {
  it("renders correctly", () => {
    const tree = getComponent("connected").toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Gets correct color", () => {
    let tree = getComponent("blanko").toJSON().children[1];
    expect(tree).toMatchSnapshot();
    expect(tree).not.toHaveStyleRule('color', darkTheme.connectedColor);
    expect(tree).not.toHaveStyleRule('color', darkTheme.disconnectedColor);
    expect(tree).not.toHaveStyleRule('color', darkTheme.connectingColor);
    tree = getComponent("disconnected").toJSON().children[1];
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', darkTheme.disconnectedColor);
    tree = getComponent("connecting").toJSON().children[1];
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', darkTheme.connectingColor);
    tree = getComponent("connected").toJSON().children[1];
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', darkTheme.connectedColor);
  });
});

