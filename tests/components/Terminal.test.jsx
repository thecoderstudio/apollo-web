import React from 'react';
import { darkTheme } from '../../src/theme';
import { Terminal } from '../../src/components/Terminal';
import chalk from 'chalk';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

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
    const spy = jest.spyOn(Terminal.prototype, 'write');
    const container = mount(<Terminal theme={darkTheme} agent={mockAgent} />);
    const agentName = container.find(Terminal).instance().chalk.hex(darkTheme.primary).bold(mockAgent.name);
    expect(spy).toHaveBeenCalledWith(`Connecting to agent ${agentName}...\n\r\n`);
  });
});
