import React from 'react';
import renderer from 'react-test-renderer';
import { darkTheme } from '../../src/theme';
import { render } from '@testing-library/react';
import Terminal from '../../src/components/Terminal';

const mockAgent = {
  // Fake UUID
  id: 'a2346886-83ba-442d-9fb7-d024c6274e22',
  name: 'test'
}

describe('Terminal', () => {
  beforeEach(() => {
    process.env = {
      APOLLO_WS_URL: 'ws://localhost:1234/'
    };
    Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  });

  it('correctly renders with unsuccessful connection', () => {
    render(<Terminal agent={mockAgent} theme={darkTheme} />);
  });
});
