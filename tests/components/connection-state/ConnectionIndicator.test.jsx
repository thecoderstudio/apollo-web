import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import ConnectionIndicator, { getColor } from '../../../src/components/connection-state/ConnectionIndicator';
import { darkTheme } from '../../../src/theme';

function getComponent(state) {
  return renderer.create(
    <ThemeProvider theme={darkTheme} >
      <ConnectionIndicator connectionState={state} />
    </ThemeProvider>
  );
}

describe("ConnectionIndicator", () => {
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

describe("getColor", () => {
  it("returns the correct color for each connectionState", () => {
    expect(getColor('fake', darkTheme)).toBe(null);
    expect(getColor('connecting', darkTheme)).toBe(darkTheme.connectingColor);
    expect(getColor('connected', darkTheme)).toBe(darkTheme.connectedColor);
    expect(getColor('disconnected', darkTheme)).toBe(darkTheme.disconnectedColor);
  });
});
