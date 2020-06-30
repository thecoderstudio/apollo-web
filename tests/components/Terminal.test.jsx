import React from 'react';
import renderer from 'react-test-renderer';
import { darkTheme } from '../../src/theme';
import Terminal from '../../src/components/Terminal';

const mockAgent = {
  // Fake UUID
  id: 'a2346886-83ba-442d-9fb7-d024c6274e22',
  name: 'test'
}

function getComponent() {
  return renderer.create(
    <Terminal agent={mockAgent} theme={darkTheme} />
  );
}

describe('Terminal', () => {
  beforeEach(() => {
    process.env = {
      APOLLO_WS_URL: 'ws://localhost:1234/'
    };
  });

  it('correctly renders with unsuccessful connection', () => {
    const tree = getComponent().toJSON();
    expect(tree).toMatchSnapshot();
  });
});
