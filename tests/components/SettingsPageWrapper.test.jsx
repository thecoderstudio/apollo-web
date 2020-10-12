import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SettingsPageWrapper from '../../src/components/SettingsPageWrapper';

function getComponent(props) {
  return renderer.create(
    <BrowserRouter>
      <SettingsPageWrapper {...props}><div /></SettingsPageWrapper>
    </BrowserRouter>
  );
}

describe("settings page wrapper", () => {
  const props = { location: { pathname: 'location' } };

  it("render correctly", () => {
    const tree = getComponent(props).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
